import { schedule } from "node-cron";
import {
  OptionType,
  Product,
  ProductDocument,
  ProductSchema,
} from "../../models/product.model";
import User, { IUserSchema } from "../../models/user.model";
import axios from "axios";
import { GetDetails } from "../../controllers/aliexpress/GetProducts.controller";
import AliExpressToken from "../../models/AliExpressTokenModel";
import { ISetting } from "../../models/Setting.model";
import { createAccessToken } from "../../utils/authHelperFunction";
import fs from 'fs';

const time: string = "0 */4 * * *";


const IsPriceDifferent = (
  product: ProductSchema,
  findProduct: ProductSchema
): boolean => {
  let findProdVarLength = findProduct?.variantsArr?.length;
  let oldProdVarLength = product?.variantsArr?.length;
  if (oldProdVarLength !== findProdVarLength) {
    return true;
  }
  for (let i = 0; i < findProdVarLength; i++) {
    let findProdPriceCurrVariant = Number(
      findProduct?.variantsArr?.[i]?.offer_sale_price
    );
    let oldProdPriceCurrVariant = Number(
      product?.variantsArr?.[i]?.offer_sale_price
    );

    if (findProdPriceCurrVariant !== oldProdPriceCurrVariant) {
      return true;
    }
  }
  return false;
};
//
const IsQuantityDifferent = (
  product: ProductSchema,
  findProduct: ProductSchema
): boolean => {
  let findProdVarLength = findProduct?.variantsArr?.length;
  let oldProdVarLength = product?.variantsArr?.length;
  if (oldProdVarLength !== findProdVarLength) {
    return true;
  }
  for (let i = 0; i < findProdVarLength; i++) {
    let findProdQuantityCurrVariant = Number(
      findProduct?.variantsArr?.[i]?.sku_available_stock
    );
    let oldProdQuantityCurrVariant = Number(
      product?.variantsArr?.[i]?.sku_available_stock
    );

    if (findProdQuantityCurrVariant !== oldProdQuantityCurrVariant) {
      return true;
    }
  }
  return false;
};
const IsVariantsDifferent = (
  product: ProductSchema,
  findProduct: ProductSchema
): boolean => {
  let findProdVarLength = findProduct?.variantsArr?.length;
  let oldProdVarLength = product?.variantsArr?.length;
  if (oldProdVarLength !== findProdVarLength) {
    return true;
  }
  for (let i = 0; i < findProdVarLength; i++) {
    let findProdQuantityCurrVariant = Number(
      findProduct?.variantsArr?.[i]?.sku_available_stock
    );
    let oldProdQuantityCurrVariant = Number(
      product?.variantsArr?.[i]?.sku_available_stock
    );
    let findProdPriceCurrVariant = Number(
      findProduct?.variantsArr?.[i]?.offer_sale_price
    );
    let oldProdPriceCurrVariant = Number(
      product?.variantsArr?.[i]?.offer_sale_price
    );
    if (
      findProdQuantityCurrVariant !== oldProdQuantityCurrVariant ||
      oldProdPriceCurrVariant !== findProdPriceCurrVariant
    ) {
      return true;
    }
  }
  return false;
};
const ProductUpToDate = schedule(time, async function () {
  try {
    console.log(
      "cron job started to update products when original product price updated"
    );
    const products: ProductDocument[] = await Product.find().exec();

    if (!products || !products?.length) return;

    /// Delete Product From DB And Sala If Not Exists And Update Sala Product Price!!!

    const updateVariantQuantity = async (id: any, access_token: any) => {
      const options = {
        method: "PUT",
        url: `https://api.salla.dev/admin/v2/products/quantities/variant/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          quantity: 0,
        },
      };
      try {
        const { data } = await axios.request(options);
        if (data.status === 201) {
          return true;
        } else return false;
      } catch (error) {
        // console.log(error)
      }
    };

    const UpdateProductVariantAfterEdit = async (
      id: any,
      access_token: any,
      price: number
    ) => {
      const options = {
        method: "PUT",
        url: `https://api.salla.dev/admin/v2/products/quantities/variant/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          price,
        },
      };
      try {
        const { data } = await axios.request(options);
        if (data.status === 201) {
          return true;
        } else return false;
      } catch (error) {
        // console.log(error)
      }
    };
    let productsRes = await Promise.allSettled(
      products.map(async (product: ProductDocument) => {
        if (!product) return;
        const user: (IUserSchema & { setting: ISetting }) | null =
          await User.findById(product.merchant).populate(
            "setting",
            "syncProdPrices syncProdQuantities"
          );
        if (!user) return;
        let token = await createAccessToken(user.id);

        let productJSON = product.toJSON();
        let aliexpressToken = await AliExpressToken.findOne({
          userId: user?._id,
        });
        let tokenInfo = {
          aliExpressAccessToken: aliexpressToken?.accessToken,
          aliExpressRefreshToken: aliexpressToken?.refreshToken,
        };
        const findProduct = await GetDetails({
          product_id: product.original_product_id as string,
          tokenInfo,
          lang: "EN",
        });

        let syncQuantities = user.setting.syncProdQuantities;
        let syncProd = user.setting.syncProdPrices;

        let findProdQuantity = findProduct.quantity;
        let oldProdQuantity = product.quantity;
        let priceIsDifferent = false;
        if (
          (syncQuantities || syncProd) &&
          IsVariantsDifferent(product, findProduct)
        ) {
          let { price, main_price, variantsArr, quantity ,options} = findProduct;
          product.price = price;
          product.main_price = main_price;
          product.options = options;
          let commissionPopulatedNewVariants = variantsArr;
          if (variantsArr?.length == product.variantsArr?.length) {
            for (let i = 0; i < product?.variantsArr?.length; i++) {
              let { profitTypeValue, commission } = product?.variantsArr?.[i];
              commissionPopulatedNewVariants[i] = {
                ...commissionPopulatedNewVariants?.[i],
                profitTypeValue,
                commission,
              };
            }
          }
          product.variantsArr = commissionPopulatedNewVariants;
          product.quantity = quantity;
          await product.save();

          if (product.salla_product_id) {
            // unlink from salla and re link
            let options = {
              url: `${process.env.Backend_Link}aliexpress/product/updateProduct/${product.id}`,
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            };
            const res = await axios.request(options);
            fs.appendFile("cronProductUpdate.json",JSON.stringify({res},null,2),()=>{})
          }
        }

        
      })
    );
  } catch (error) {
    console.log("Error while getting products details and update..");
    console.log(error);
  }
});

export default ProductUpToDate;

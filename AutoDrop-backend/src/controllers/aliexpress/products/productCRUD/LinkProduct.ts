//@ts-nocheck
import axios, { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { pick, uniqBy } from "lodash";
import AppError from "../../../../utils/appError";
import User from "../../../../models/user.model";
import {
  OptionType,
  Product,
  ProductDocument,
  ProductSchema,
  ValueType,
} from "../../../../models/product.model";
import SallaToken from "../../../../models/SallaTokenModel";
import MakeRequest from "../../features/Request";
import AliExpressToken from "../../../../models/AliExpressTokenModel";
import {
  UpdateProductVariant,
  UpdateProductVariantSale,
  getProductSkus,
  getProductVariants,
} from "./CRUD";
import { RefreshTokenHandler } from "../../../salla/RefreshAccessToken";
import { ProductSallaChecker } from "./features/AlreadyLinkedProduct";


export const updateVariantFinalOption2 = async (
  product: ProductDocument,
  token: string,
  tokenData
) => {
  const jsonProduct = product.toJSON();
  const data = await getProductVariants(product.salla_product_id, 1, token);
  console.log(data?.pagination?.totalPages);
  if (false) {
    for (let i = 0; i < data.pagination.totalPages; i++) {
      const vr = await getProductVariants(
        product.salla_product_id,
        i + 1,
        token
      );
      const variants = vr.data.filter((e) => !e.sku);
      if (!variants.length) return;
      await Promise.all(
        variants.map(async (variant: any) => {
          if (!variant.sku) {
            const salla_option_ids = variant.related_option_values;
            const values = await Promise.all(
              jsonProduct.options.map(async (option: OptionType) => {
                const value = option.values.find((val) =>
                  salla_option_ids.includes(val?.salla_value_id)
                );
                return value;
              })
            );
            const getSkusId = async (values: any) => {
              const skus = await getProductSkus(product.original_product_id);
              const keyWords = values.map((val: any) => val.name);
              await Promise.all(
                skus.map(async (sku: any) => {
                  const skusOptions =
                    sku.ae_sku_property_dtos.ae_sku_property_d_t_o;
                  const check =
                    sku.ae_sku_property_dtos.ae_sku_property_d_t_o.filter(
                      (property: any, idx: number) => {
                        if (property.property_value_definition_name) {
                          if (
                            keyWords.includes(
                              property.property_value_definition_name
                            )
                          )
                            return property;
                        } else {
                          if (
                            keyWords.includes(property.sku_property_value) ||
                            property.sku_property_name === "Ships From"
                          )
                            return property;
                        }
                      }
                    );
                  if (check.length === skusOptions.length) {
                    const optionValue = values.find(
                      (val: any) =>
                        val.name === sku.id.split(";")[0].split("#")[1] ||
                        val.sku === sku.id.split(";")[0]
                    );
                    const { price, quantity } = optionValue;
                    let mnp = getRandomInt(100000000000000, 999999999999999);
                    let gitin = getRandomInt(10000000000000, 99999999999999);
                    let barcode = [mnp, gitin].join("");
                    let result = await UpdateProductVariant(
                      variant.id,
                      barcode,
                      price,
                      quantity,
                      mnp,
                      gitin,
                      sku.sku_id,
                      token
                    );
                    while (!result) {
                      mnp = getRandomInt(100000000000000, 999999999999999);
                      gitin = getRandomInt(10000000000000, 99999999999999);
                      barcode = [mnp, gitin].join("");
                      result = await UpdateProductVariant(
                        variant.id,
                        barcode,
                        price,
                        quantity,
                        mnp,
                        gitin,
                        sku.sku_id,
                        token
                      );
                    }
                  }
                })
              );
            };
            await getSkusId(values);
          }
        })
      );
    }
  } else {
    const variants = data.data.filter((e: any) => !e.sku);

    // console.log("variants", variants);
    let variantsIds = variants.map((el: any) => {
      return el.id;
    });
    console.log(variantsIds);
    console.log(variantsIds.length);
    // console.log("productsVariantsArr", product?.variantsArr);

    let { variantsArr, showDiscountPrice } = product;
    let promises = variantsArr.map((el, index) => {
      let variantId = variantsIds[index];
      let {
        offer_sale_price: price,
        sku_available_stock: quantity,
        sku_id,
        sku_price: oldPrice,
      } = el;
      console.log(
        "product?.commissionPercentage",
        product?.commissionPercentage
      );
      if (product?.vendor_commission && !product?.commissionPercentage) {
        price = parseFloat(price) + product?.vendor_commission;
      } else if (product?.vendor_commission && product?.commissionPercentage) {
        price =
          (product?.vendor_commission / 100) * parseFloat(price) +
          parseFloat(price);
      }
      let mnp = getRandomInt(100000000000000, 999999999999999);
      let gitin = getRandomInt(10000000000000, 99999999999999);
      let barcode = [mnp, gitin].join("");
      // add condition for sale enabling in product
      if (oldPrice && showDiscountPrice) {
        return UpdateProductVariantSale(
          variantId,
          barcode,
          oldPrice,
          quantity,
          mnp,
          gitin,
          sku_id,
          token,
          price
        );
      }
      return UpdateProductVariant(
        variantId,
        barcode,
        price,
        quantity,
        mnp,
        gitin,
        sku_id,
        token
      );
    });

    let results = await Promise.all(promises);

    results.forEach((result) => {
      console.log(result?.data);
    });
    return;
  }
};

function getRandomInt(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
export async function LinkProductSalla2(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("reached this 1 ");

    const { role, _id } = req.user;
    let { productId } = req.body;
    let product: any = await Product.findById(productId);
    const sallaTokenDocument = await SallaToken.findOne({
      _id: req.user.sallaToken,
    });
    const aliexpressDoc = await AliExpressToken.findOne({
      _id: req.user.aliExpressToken,
    });
    let { accessToken } = sallaTokenDocument!;
    let token = accessToken;
    let access_token = accessToken;
    let tokenData = {
      aliExpressAccessToken: aliexpressDoc?.accessToken,
      aliExpressRefreshToken: aliexpressDoc?.refreshToken,
    };

    const jsonProduct = product?.toJSON();
    /*  if (userType === "admin") {
      account = await User.findOne({
        _id: merchant,
        userType: "vendor",
      }).exec();
    }  */
    console.log("reached this 2 ");
    let noOptionsInProduct = false;
    let prodPrice = parseFloat(product.variantsArr[0].offer_sale_price);
    let totalPrice =
      (product?.vendor_commission / 100) * prodPrice + prodPrice;
    if (!product.commissionPercentage) {
      totalPrice = product?.vendor_commission + prodPrice;
    }
    let bodyDataSalla = {
      name: req.query.name || product.name,
      price: totalPrice,
      product_type: product.product_type,
      quantity: product.quantity,
      description: product.description,
      cost_price: product.main_price,
      require_shipping: product.require_shipping,
      sku: product.sku,
      images: product.images,
      options: product.options,
      metadata_title: product?.metadata_title,
      metadata_description: product?.metadata_description,
    };
if(product?.categoriesSalla){
  bodyDataSalla.categories=product?.categoriesSalla
}
if (product?.showDiscountPrice) {
  let originalPrice = parseFloat(product.variantsArr[0].sku_price);
  bodyDataSalla.price = originalPrice
  bodyDataSalla.sale_price = totalPrice
}
    if (!product?.options[0]?.name) {
      noOptionsInProduct = true;
      let prodPrice = parseFloat(product.variantsArr[0].offer_sale_price);
      console.log("no options hereeeeee");
      let totalPrice =
        (product?.vendor_commission / 100) * prodPrice + prodPrice;
      if (!product.commissionPercentage) {
        totalPrice = product?.vendor_commission + prodPrice;
      }
      bodyDataSalla = {
        name: req.query.name || product.name,
        price: totalPrice,
        product_type: product.product_type,
        quantity: product.variantsArr[0].sku_available_stock,
        description: product.description,
        cost_price: product.main_price,
        require_shipping: product.require_shipping,
        sku: product.sku,
        images: product.images,

        metadata_title: product?.metadata_title,
        metadata_description: product?.metadata_description,
      };
      if (product?.showDiscountPrice) {
        let originalPrice = parseFloat(product.variantsArr[0].sku_price);
        bodyDataSalla.price = originalPrice
        bodyDataSalla.sale_price = totalPrice
       /*  bodyDataSalla = {
          name: req.query.name || product.name,
          price: originalPrice,
          sale_price: totalPrice,
          product_type: product.product_type,
          quantity: product.variantsArr[0].sku_available_stock,
          description: product.description,
          cost_price: product.main_price,
          require_shipping: product.require_shipping,
          sku: product.sku,
          images: product.images,

          metadata_title: product?.metadata_title,
          metadata_description: product?.metadata_description,
        }; */
      }
      if(product?.categoriesSalla){
        bodyDataSalla.categories=product?.categoriesSalla
      }
    }
    const options_1 = {
      method: "POST",
      url: "https://api.salla.dev/admin/v2/products",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: bodyDataSalla,
    };

    console.log("here");
    // console.log(product);
    /* try {
    } catch (err: any) {
      console.log(err?.response?.status);
      if (err?.response?.status === 401) {
        // get new access token
        RefreshTokenHandler(token);
      }
    } */
    // let createdeProduct;

    // let { data: createdeProduct } = await axios.request(options_1);

    let createdeProduct = await ProductSallaChecker(
      options_1,
      product?.sku,
      token,
      req,
      res,
      next
    );
    if (createdeProduct?.message == "Cancel") {
      return;
    } else if (createdeProduct?.message == "Error") {
      throw new AppError("sku already linked to a product on Salla", 400);
    }
    console.log(createdeProduct);
    /*    try {
      createdeProduct = data;
    } catch (error: any) {
      console.error(error?.response?.body)
      if (
        error?.response?.data?.status === 401 &&
        error?.response?.data?.error?.code === "Unauthorized"
      ) {
        // get new access tokens
        console.log("get new access tokens");
        console.log(req.headers["authorization"]);
        let data = await RefreshTokenHandler(token, req.user.sallaToken);
        console.log(data);
      }
    } */
    /* 
    error?.response?.data
{
  status: 401,
  success: false,
  error: { code: 'Unauthorized', message: 'The access token is invalid' }
}    */
    const opt = {
      method: "GET",
      url: `https://api.salla.dev/admin/v2/products/${createdeProduct.data.id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("here");

    const { data: productResult } = await axios.request(opt);
    console.log(createdeProduct.data.id);

    // console.log(productResult.data.options[0].values);
    product.options = await Promise.all(
      jsonProduct.options.map(async (option: OptionType, index: number) => {
        let obj: OptionType = option;
        const productOption = productResult.data.options[index];
        const values = await Promise.all(
          option.values.map(async (value: ValueType, idx: number) => {
            const optionValue = productOption?.values?.[idx];
            console.log(optionValue);
            const mnp = getRandomInt(100000000000000, 999999999999999);
            const gitin = getRandomInt(10000000000000, 99999999999999);
            return {
              ...value,
              mpn: mnp,
              gtin: gitin,
              salla_value_id: optionValue?.id,
            };
          })
        );

        obj.salla_option_id = productOption?.id;
        obj.values = values;
        //this is new
        return obj;
      })
    );

    const finalOptions = await Promise.all(
      jsonProduct.options.map(async (option: OptionType, idx: number) => {
        const values = await Promise.all(
          option.values.map(async (optionValue: any, i: number) => {
            return optionValue;
          })
        );
        return {
          ...option,
          values,
        };
      })
    );

    product.options = finalOptions;
    product.salla_product_id = productResult.data?.id;
    if (noOptionsInProduct) {
      await Promise.all([product.save()]);
      return res.status(200).json({
        message: "Product created successfully",
        result: {
          urls: productResult.data.urls || {},
        },
      });
    }
    (async () =>
      await updateVariantFinalOption2(product, access_token, tokenData))().then(
      async () => {
        /*       if (subscription.products_limit)
          subscription.products_limit = subscription.products_limit - 1; */
        // await Promise.all([product.save(), subscription.save()]);
        await Promise.all([product.save()]);
        return res.status(200).json({
          message: "Product created successfully",
          result: {
            urls: productResult.data.urls || {},
          },
        });
      }
    );
  } catch (error: AxiosError | any) {
    const isAxiosError = error instanceof AxiosError;

    
    const values = error?.response?.data;
    console.log(error?.response?.data);
    console.log(error?.response?.data?.error?.fields?.sku);
    console.log(error?.response?.data?.error?.fields?.price);
    console.log(
      error?.response?.data?.error?.fields?.visibility_condition_type
    );
    console.log(
      error?.response?.data?.error?.fields?.visibility_condition_option
    );
    console.log(
      error?.response?.data?.error?.fields?.visibility_condition_value
    );
    console.log(error?.response?.data?.error?.fields?.["options.0.name"]);
    console.log(
      error?.response?.data?.error?.fields?.["options.0.values.0.name"]
    );
    console.log(error?.response?.data?.error?.fields?.metadata_title);
    next(isAxiosError ? new AppError(values, 400) : error);
  }
}

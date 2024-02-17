//@ts-nocheck

import axios, { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { pick } from "lodash";
import AppError from "../../../../utils/appError";
import User from "../../../../models/user.model";
import {
  OptionType,
  Product,
  ProductSchema,
  ValueType,
} from "../../../../models/product.model";
import SallaToken from "../../../../models/SallaTokenModel";

export async function CreateProductController(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  try {
    //   let token: string | undefined, account: UserDocument | null;
    //   let subscription: SubscriptionDocument | null;
    //console.log(req.user);
    /*     console.log(req.user._id.toString());
     */
    const { role, _id } = req.user;
    /*     console.log(req.user.aliExpressToken);
    console.log(req.user.sallaToken);
    console.log(req.user.role); */
    const sallaTokenDocument = await SallaToken.findOne({
      userId: req.user._id,
    });
    let { accessToken } = sallaTokenDocument;
    let token = accessToken;
    let access_token = token;
    console.log(access_token);
    console.log(token);
    /*    const { access_token, user_id, userType } = pick(req.local, [
      "user_id",
      "access_token",
      "userType",
    ]);
 */
    let {
      merchant,
      vendor_commission,
      main_price,
      metadata_title,
      metadata_description,
      name,
      price,
      ...body
    } = pick(req.body, [
      "name",
      "description",
      "vendor_commission",
      "main_price",
      "price",
      "quantity",
      "sku",
      "images",
      "options",
      "metadata_title",
      "metadata_description",
      "product_type",
      "original_product_id",
      "merchant",
    ]) satisfies Partial<ProductSchema>;
    if (price < main_price) {
      [price, main_price] = [main_price, price];
    }
    /*   subscription = await CheckSubscription(
      userType === "vendor" ? user_id : merchant,
      "products_limit"
    ); */

    const product = new Product({
      name: req.query.name || name,
      ...body,
      price,
      vendor_commission,
      main_price,
      merchant: role === "client" ? _id : merchant,
      sku_id: req.body.sku_id,
      vat: req.body?.vat && true,
    });

    const vendor_price = parseFloat(
      ((main_price * vendor_commission) / 100).toFixed(2)
    );

    product.vendor_price = vendor_price;
    product.vendor_commission = vendor_commission;
    product.metadata_title = metadata_title;
    product.metadata_description = metadata_description;

    const options = body?.options?.map((option: any) => {
      const values = option.values;
      return {
        ...option,
        values: values?.map((value: any) => {
          const valuePrice = value.original_price;
          const vendorOptionPrice = parseFloat(
            (valuePrice + (valuePrice * vendor_commission) / 100).toFixed(2)
          );

          return {
            ...value,
            original_price: valuePrice,
            price: vendorOptionPrice,
          };
        }),
      };
    });

    product.options = options;
    // token = access_token;

    /*  if (userType === "admin") {
      account = await User.findOne({
        _id: merchant,
        userType: "vendor",
      }).exec();
    } */

    const options_1 = {
      method: "POST",
      url: "https://api.salla.dev/admin/v2/products",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: req.query.name || product.name,
        price: product.price,
        product_type: product.product_type,
        quantity: product.quantity,
        description: product.description,
        cost_price: product.main_price,
        require_shipping: product.require_shipping,
        sku: product.sku,
        images: product.images,
        options: product.options,
        metadata_title,
        metadata_description,
      },
    };

    const jsonProduct = product.toJSON();

    const valuesStock = new Array().concat(
      //@ts-ignore
      ...jsonProduct.options?.map((option: any) => option.values)
    );
    if (valuesStock.length > 100)
      throw new AppError("Values count should be smaller than 100", 400);

    const { data: productResult } = await axios.request(options_1);
    console.log(productResult);
    return;
    product.options = await Promise.all(
      // @ts-ignore
      jsonProduct.options?.map(async (option: OptionType, index: number) => {
        let obj: OptionType = option;
        const productOption = productResult.data.options[index];
        const values = await Promise.all(
          option.values.map(async (value: ValueType, idx: number) => {
            const optionValue = productOption?.values?.[idx];
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
      })
    );

    const finalOptions = await Promise.all(
      //@ts-ignore
      jsonProduct.options.map(async (option: OptionType, idx: number) => {
        const values = await Promise.all(
          option.values.map(async (optionValue: any, i: number) => {
            const variants =
              (await allVaraint(productResult.data.id, token)) || [];
            const variant = variants.find((item: any) =>
              item.related_option_values?.includes(optionValue.salla_value_id)
            );
            const mnp = getRandomInt(100000000000000, 999999999999999);
            const gitin = getRandomInt(10000000000000, 99999999999999);
            const { price, quantity, mpn, gtin, sku, id, sku_id } = optionValue;
            const barcode = [mnp, gitin].join("");
            if (!variant) return optionValue;
            let result = await UpdateProductVariant(
              variant.id,
              barcode,
              price,
              quantity,
              mnp,
              gitin,
              sku_id,
              access_token
            );
            if (!result) {
              result = await UpdateProductVariant(
                variant.id,
                barcode,
                price,
                quantity,
                mnp,
                gitin,
                sku_id,
                access_token
              );
            }
            return {
              ...optionValue,
              salla_variant_id: result?.data?.id,
            };
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
    /* (async () => await updateVariantFinalOption(product, access_token))().then(
      async () => {
        if (subscription.products_limit)
          subscription.products_limit = subscription.products_limit - 1;
        await Promise.all([product.save(), subscription.save()]);
        res.status(200).json({
          message: "Product created successfully",
          result: {
            urls: productResult.data.urls || {},
          },
        });
      }
    ); */
  } catch (error: AxiosError | any) {
    const isAxiosError = error instanceof AxiosError;
    const values = error?.response?.data;
    console.log(error + "\n\n\n");
    console.log(values);
    next(
      isAxiosError ? new AppError("UnprocessableEntity " + values, 400) : error
    );
  }
}
function getRandomInt(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
export const getProductVariants = async (
  id: any,
  pages: any,
  access_token: any
) => {
  const options = {
    method: "GET",
    url: `https://api.salla.dev/admin/v2/products/${id}/variants?page=${pages}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const { data } = await axios.request(options);
    if (data.status === 200) {
      return data;
    } else return;
  } catch (error) {
    console.log(error);
  }
};
const allVaraint = async (id: any, token: any) => {
  let all: any = [];
  await getProductVariants(id, 1, token).then(async (variantResult) => {
    if (variantResult) {
      if (variantResult?.pagination?.totalPages > 1) {
        for (let i = 0; i < variantResult.pagination.totalPages; i++) {
          const vr = await getProductVariants(id, i + 1, token);
          all.push(...vr.data);
        }
      } else {
        all.push(...variantResult.data);
      }
    }
  });
  return all;
};
const UpdateProductVariant = async (
  variantId,
  barcode,
  price,
  stock_quantity,
  mpn,
  gtin,
  sku,
  token
) => {
  const options = {
    method: "PUT",
    url: `https://api.salla.dev/admin/v2/products/variants/${variantId}`,
    params: {
      sku,
      barcode,
      price,
      stock_quantity,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      sku,
      barcode,
      price,
      stock_quantity,
      mpn,
      gtin,
    },
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    if (error.response?.data?.error?.fields) {
      console.log(error.response?.data?.error.fields);
    } else {
      console.log(error.response?.data);
    }
  }
};

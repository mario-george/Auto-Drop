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

export async function LinkProductSalla(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  try {
    const { role, _id } = req.user;

let {productId} = req.body
let product = await Product.findById(productId)
    const sallaTokenDocument = await SallaToken.findOne({
      _id: req.user.sallaToken,
    });
    let { accessToken } = sallaTokenDocument!;
    let token = accessToken;
    let access_token = accessToken;

    const options_1 = {
      method: "POST",
      url: "https://api.salla.dev/admin/v2/products",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: product.name,
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
    product.salla_product_id = productResult.data?.id;
    console.log(productResult.data?.id);
    // let SentOptionsResolved = [];
    const getVariantsIds = {
      method: "GET",
      url: `https://api.salla.dev/admin/v2/products/${productResult.data?.id}/variants`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let variants = await axios.request(getVariantsIds);
    let res = [];
    for (let [index, VarEl] of variants.data.data.entries()) {
      console.log(VarEl.id);
      let op = product.options.map((option) => option.values).flat();
      // console.log(op);
      console.log(op.length);
      console.log(variants.data.data.length);
      if (index >= op.length) {
        console.log("index out of range");
        break;
      }

      let { sku, price, quantity, original_price } = op[index];

      let varUpdate = {
        method: "PUT",
        url: `https://api.salla.dev/admin/v2/products/variants/${VarEl.id}?sku=${sku}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          // sku,
          price,
          stock_quantity: quantity,
          sale_price: price,
        },
      };
      console.log("first variant added with sku", sku);
      res.push(axios.request(varUpdate));
      //
    }

    console.log("done updating price");
    // update quantity
    let res2 = [];
    for (let [index, VarEl] of variants.data.data.entries()) {
      console.log(VarEl.id);
      let op = product.options.map((option) => option.values).flat();
      if (index >= op.length) {
        console.log("index out of range");
        break;
      }
      let { quantity } = op[index];
      console.log(op[index]);
      let varUpdate = {
        method: "PUT",
        url: `https://api.salla.dev/admin/v2/products/quantities/variant/${VarEl.id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          quantity,
        },
      };

      res2.push(axios.request(varUpdate));
      //
    }
    // console.log(variants);
    console.log("done updating quantity");
    let respData = await Promise.all(res);
    let respData2 = await Promise.all(res2);
    console.log(respData);
    console.log(respData2);
    return;

    //
    /*     for (let option of product.options) {
      for (let value of option.values) {
      }
      let options2 = {
        method: "POST",
        url: `https://api.salla.dev/admin/v2/products/${productResult.data?.id}/options`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          display_type: option.display_type,
          name: option.name,
          values: [option.values[0]],
        },
      };

      let response = await axios.request(options2);
      SentOptionsResolved.push(response);
    } */

    // let resolvedOptions = await Promise.all(SentOptionsResolved);
    /*     let optionsIds = resolvedOptions.map((option: any) => {
      return option.data.data.id;
    }); */

    try {
      // let res2 = await Promise.all(valuseSent.flat());

      // console.log(res2);
      console.log("success");
    } catch (e) {
      //console.log(e);
      //console.log(e.data.error.fields.values);
      // console.log(e.response.data.error.fields);
      console.log(e.response);
    }

    return;
    product.options = await Promise.all(
      // @ts-ignore
      jsonProduct.options?.map(async (option: OptionType, index: number) => {
        let obj: OptionType = option;
        const productOption = productResult.data.options[index];

        const values = await Promise.all(
          option.values.map(async (value: ValueType, idx: number) => {
            const optionValue = productOption?.values[idx];
            const mnp = getRandomInt(100000000000000, 999999999999999);
            const gitin = getRandomInt(10000000000000, 99999999999999);

            console.log(optionValue.id);
            // console.log(optionValue.id);

            return {
              ...value,
              mpn: mnp,
              gtin: gitin,
              // salla_value_id: value?.id,
              //salla_value_id: optionValue?.id,
            };
          })
        );

        obj.salla_option_id = productOption?.id;
        obj.values = values;
      })
    );
    console.log(productResult.data.id);
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
    let aliexpressDoc = await AliExpressToken.findById(
      req.user.aliExpressToken
    );
    let tokenData = {
      aliExpressAccessToken: aliexpressDoc?.accessToken,
      aliExpressRefreshToken: aliexpressDoc?.refreshToken,
    };
    product.options = finalOptions;
    (async () =>
      await updateVariantFinalOption(product, access_token, tokenData))().then(
      async () => {
        /*         if (subscription.products_limit)
          subscription.products_limit = subscription.products_limit - 1; */
        // await Promise.all([product.save(), subscription.save()]);
        await product.save();
        res.status(200).json({
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
    console.log(error + "\n\n\n");
    console.log(values);
    console.log(values.error.fields);
    next(
      isAxiosError ? new AppError("UnprocessableEntity " + values, 400) : error
    );
  }
}
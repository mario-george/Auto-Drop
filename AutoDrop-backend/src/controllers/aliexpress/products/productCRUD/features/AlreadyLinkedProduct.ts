import axios, { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import AppError from "../../../../../utils/appError";
import { LinkProductSalla2 } from "../LinkProduct";

export default async function AlreadyLinkedProduct(
  sku?: string,
  token?: string,
  next?: NextFunction
) {
  let optDeleteProductBySku = {
    method: "DELETE",
    url: `https://api.salla.dev/admin/v2/products/sku/${sku}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let { data: skuResp } = await axios.request(optDeleteProductBySku);
    let status = skuResp?.status;
    // let code = skuResp?.code
    let dataCode = skuResp?.data?.code;
    let success = skuResp?.success;

    console.log(skuResp?.status);
    // console.log(skuResp?.code)
    console.log(skuResp?.data?.code);
    console.log(success);
    if (success) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log(err?.response?.data);
    if (next) {
      return next(err);
    }
    return;
  }
}
export const ProductSallaChecker: any = async (
  optionsObj: any,
  sku?: string,
  token?: string,
  req?: Request & any,
  res?: Response,
  next?: NextFunction,
  product?: any
) => {
  console.log(optionsObj);
  try {
    let { data } = await axios.request(optionsObj);
    return data;
  } catch (err: any) {
    const axiosError = err as AxiosError;

    console.log(err?.response?.data);
    let status = err?.response?.data?.status;
    let success = err?.response?.data?.success;
    let errorFieldSku = err?.response?.data?.error?.fields?.sku;
    let priceErr = err?.response?.data?.error?.fields?.price;
    let nameErr = err?.response?.data?.error?.fields?.name;
    let visibility_condition_type =
      err?.response?.data?.error?.fields?.visibility_condition_type;
    let visibility_condition_option =
      err?.response?.data?.error?.fields?.visibility_condition_option;
    let visibility_condition_value =
      err?.response?.data?.error?.fields?.visibility_condition_value;
    if (visibility_condition_type) {
      console.log("visibility_condition_type", visibility_condition_type);
    }
    if (visibility_condition_option) {
      console.log("visibility_condition_option", visibility_condition_option);
    }
    if (visibility_condition_value) {
      console.log("visibility_condition_value", visibility_condition_value);
    }
    if (nameErr) {
      console.log("nameErr", nameErr);
    }
    if (priceErr) {
      console.log("priceErr", priceErr);
    }

    if (status) {
      console.log("status", status);
    }
    if (success) {
      console.log("success", success);
    }
    if (errorFieldSku) {
      console.log("errorFieldSku", errorFieldSku);
    }

    console.log(
      status == 422 && success == false && errorFieldSku?.[0]?.includes("SKU")
    );
    if (
      visibility_condition_type &&
      visibility_condition_option &&
      visibility_condition_value &&
      res &&
      next
    ) {
      if (product)
        product.options = product?.options.map((option: any, index: number) => {
          let newV = option.values.map((value: any, index: number) => {
            return { ...value, name: index + " " + value.name };
          });
          return {
            ...option,
            /*      visibility: "always",
            visibility_condition_type: "=",
            visibility_condition_option: option.name + index,
            visibility_condition_value: option.name + index, */
            values: newV,
          };
        });
      await product.save();
      await LinkProductSalla2(req, res, next);
      return { message: "Cancel" };
    }
    if (
      status == 422 &&
      success == false &&
      errorFieldSku?.[0]?.includes("SKU")
    ) {
      console.log("SKU is already linked to a product on Salla");
      let successFullUnLink = await AlreadyLinkedProduct(sku, token, next);
      console.log("1111");
      console.log(successFullUnLink);
      if (successFullUnLink) {
        // Call LinkProductSalla2 again
        console.log("2222");
        if (res && next) {
          await LinkProductSalla2(req, res, next);
          return { message: "Cancel" };
        } else {
          // Handle the case where res is undefined
          console.error("res/next is undefined");
        }
        return { message: "Error" };
      }
      return { message: "Error" };
    }
    // throw new AppError("sku already linked to a product on Salla", 400);
  }
};

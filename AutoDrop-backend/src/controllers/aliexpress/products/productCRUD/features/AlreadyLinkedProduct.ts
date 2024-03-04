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
export const ProductSallaChecker = async (
  optionsObj: any,
  sku?: string,
  token?: string,
  req?: Request & any,
  res?: Response,
  next?: NextFunction
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
    console.log(priceErr);
    console.log(status);
    console.log(success);
    console.log(errorFieldSku);
    console.log(
      status == 422 && success == false && errorFieldSku[0]?.includes("SKU")
    );
    if (
      status == 422 &&
      success == false &&
      errorFieldSku[0]?.includes("SKU")
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
        } else {
          // Handle the case where res is undefined
          console.error("res/next is undefined");
        }
        return;
      }
      return;
    }
    throw new AppError("sku already linked to a product on Salla", 400);
  }
};

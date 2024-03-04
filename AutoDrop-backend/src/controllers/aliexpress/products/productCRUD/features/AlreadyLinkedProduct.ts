import axios, { AxiosError } from "axios";
import { NextFunction } from "express";
import AppError from "../../../../../utils/appError";

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
    if (status === 202 && success && dataCode === 200) {
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
      if (successFullUnLink) return;

      return;
    }
    throw new AppError("sku already linked to a product on Salla", 400);
  }
};

import MakeRequest from "../Request";
import AppError from "../../../../utils/appError";

interface ShippingParams {
  sku_id: string;
  country_code?: string;
  product_id: string;
  product_num: string;
  province_code?: string;
  send_goods_country_code?: string;
  price_currency?: string;
}
interface NewShippingParams {
  quantity: number;
  shipToCountry: string;
  productId: number;
  language: string;
  source: string;
  locale: string;
  selectedSkuId: string;
  currency: string;
}
export const getProductShippingServices = async (
  params: ShippingParams,
  tokenInfo: any
) => {
  return new Promise((resolve, reject) => {
    const method = "aliexpress.logistics.buyer.freight.get";
    const data = {
      method,
      aeopFreightCalculateForBuyerDTO: JSON.stringify(params),
      sign_method: "sha256",
    };
    MakeRequest(data, tokenInfo).then(({ data }) => {
      // console.log("data",data?.aliexpress_logistics_buyer_freight_get_response?.result?.aeop_freight_calculate_result_for_buyer_dtolist)
      const error = data.error_response;
      const result =
        data?.aliexpress_logistics_buyer_freight_get_response?.result
          ?.aeop_freight_calculate_result_for_buyer_dtolist
          ?.aeop_freight_calculate_result_for_buyer_d_t_o;
      if (error) return reject(new AppError("UnprocessableEntity", 400));
      return resolve(result);
    });
  });
};
export const getNewProductShippingServices = async (
  params: NewShippingParams,
  tokenInfo: any
) => {
  return new Promise((resolve, reject) => {
    const method = "aliexpress.ds.freight.query";
    const data = {
      method,
      queryDeliveryReq: JSON.stringify(params),
      sign_method: "sha256",
    };
    MakeRequest(data, tokenInfo).then(({ data }) => {
      const error = data.error_response;
      const result =
        data?.aliexpress_ds_freight_query_response?.result?.delivery_options?.delivery_option_d_t_o;
      console.log("NEW SHIPPING RESULT", result);
      console.log("NEW SHIPPING DATA", data);
      if (error) return reject(new AppError("UnprocessableEntity", 400));
      return resolve(result);
    });
  });
};

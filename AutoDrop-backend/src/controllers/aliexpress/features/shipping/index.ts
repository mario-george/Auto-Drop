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
      const error = data.error_response;
      const result =
        data?.aliexpress_cs_buyer_freight_get_response?.result
          ?.aeop_freight_calculate_result_for_buyer_dtolist
          ?.aeop_freight_calculate_result_for_buyer_d_t_o;
      if (error) return reject(new AppError("UnprocessableEntity", 400));
      return resolve(result);
    });
  });
};

import { Order, OrderDocument } from "../../models/Order.model";
import AppError from "../../utils/appError";
import MakeRequest from "../aliexpress/features/Request";
import { Product } from "../../models/product.model";
import { getProductSkus } from "../aliexpress/products/productCRUD/CRUD";
import AliExpressToken from "../../models/AliExpressTokenModel";
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Response } from "express";
import * as translateModule from "@vitalets/google-translate-api";

// You need to register the languages you are going to use

/* translateModule.translate('الرياض', {from: 'ar', to: 'en'}).then((res:any) => {
    console.log(res.text);
}).catch((err:any) => {
    console.error(err);
}); */
interface CustomerDataType {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  country: string | undefined;
  region: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  district: string | undefined;
  address: string | undefined;
}
export async function PlaceOrder(order: OrderDocument, order_memo: string,CustomerData:CustomerDataType,shippingCurrIndex:number[]) {
  return new Promise(async (resolve, reject) => {
    let logistics_address: object, product_items: any[];
    const { items, shipping } = order.toJSON();
    const orderData = order.toJSON();
    let tokenData: any;
    try {
      let aliexpressDoc = await AliExpressToken.findOne({
        userId: items?.[0]?.product?.merchant,
      });
      tokenData = {
        aliExpressAccessToken: aliexpressDoc?.accessToken,
        aliExpressRefreshToken: aliexpressDoc?.refreshToken,
      };
    } catch (err: any) {
      console.error("failed to get aliexpress token data of user");
      console.error(err);
    }
    product_items = await Promise.all(
      (items as any[])
        ?.map(async (item: any,itemIndex:number) => {
          const product = await Product.findById(item?.product?._id).exec();
          if (!product) return;

          const { data: aliProduct } = await MakeRequest(
            {
              method: "aliexpress.ds.product.get",
              product_id: product.original_product_id,
              sign_method: "sha256",
            },
            tokenData
          );
          // const productSkus = await getProductSkus(product.original_product_id)

          // console.log("productSkus",productSkus)
          // const sku_attr = productSkus.find((sku:any) => sku.sku_id === item.sku ||sku.id.split(';')[0].split('#')[0] === item.sku )
          // console.log("sku_attr",sku_attr)

          const sku_attr = item.choosenVariant;
       
          if (sku_attr) {
         console.log("[shippingCurrIndex?.[itemIndex]",item?.product?.shipping?.[shippingCurrIndex?.[itemIndex]??0])
            return {
              product_id: Number(product.original_product_id),
              sku_attr: sku_attr.sku_code,

              logistics_service_name: item?.product?.shipping?.[shippingCurrIndex?.[itemIndex]??0]?.serviceName,
              
              order_memo:
                order_memo ??
                "Please Don't Put any logo on the products , We are using dropshipping service in our store",
              product_count: item?.quantity,
            };
          } else {
            return reject(
              new AppError(
                "Error Happend While Send Order Contact Support",
                400
              )
            );
          }
        })
        .filter((e: any) => e)
    );
    const full_name = "test account" ?? `${orderData?.customer?.first_name} ${orderData?.customer?.last_name}`;
    const addresss = shipping?.address;

    // let cityEn = await translateModule.translate(addresss.city, {from: 'ar', to: 'en'}).then((res:any) => {return res.text}).catch((err:any) => {

    /*    translateModule.translate(addresss.city, {from: 'ar', to: 'en'}).then((res:any) => {
      cityEn= res.text
      console.log(res.text);
  }).catch((err:any) => {
      console.error(err);
  }); */
    let cityEn =
      (
        await translateModule
          .translate(addresss.city, { from: "ar", to: "en" })
          .catch((err) => {})
      )?.text ?? "Riyadh";
    // let cityEn = translateRes.text
    let addressEn =
      (
        await translateModule
          .translate(addresss.shipping_address, { from: "ar", to: "en" })
          .catch(() => {})
      )?.text ??
      "Airport Road, King Khalid International Airport, Riyadh , Saudi Arabia";
    console.log("addressEn", addressEn);
    /* 
  translateModule.translate('الرياض', {from: 'ar', to: 'en'}).then((res:any) => {
    console.log(res.text);
}).catch((err:any) => {
    console.error(err);
}); */
    logistics_address = {
      country: "SA",
      city: cityEn,
      zip: addresss?.postal_code,
      // address:  `Airport Road, King Khalid International Airport, Riyadh , Saudi Arabia` ?? `${addresss?.street_en} ${addresss?.district_en}`,
      // address:  `${addresss?.shipping_address}`,
      // address: 'Qasr Al Khaleej'?? addressEn,
      address: `Qasr Al Khaleej King Khalid` ,

      locale: "ar_SA",
      phone_country: "+966",
      full_name,
      is_foreigner: "false",
      mobile_no: "563754267" ?? `${orderData.customer?.mobile}`,
      contact_person: full_name,
      // province:addresss?.province_en??"Eastern"
      province: cityEn+ " Province",
      // location_tree_address_id: "903200190000000000-903200190137000000",
    };
    console.log("logistics_address", logistics_address);

    const min = 100000000;
    const max = 999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const data = JSON.stringify({
      logistics_address,
      out_order_id: randomNumber,
      // out_order_id:"123456789",

      
      product_items,
    });
console.log("randomNumber",randomNumber)
    const method = "aliexpress.trade.buy.placeorder";
    const option = {
      method,
      param_place_order_request4_open_api_d_t_o: data,
      sign_method: "sha256",
    };
    try {
      MakeRequest(option, tokenData).then(async ({ data }) => {
        const error = data.error_response;
        console.log("DATAAA", data);
        if (error) return reject(new AppError(error.msg, 400));
        const result =
          data?.aliexpress_trade_buy_placeorder_response?.result?.order_list;
        if (result?.number[0]) {
          await Order.findByIdAndUpdate(
            order.id,
            {
              $set: {
                tracking_order_id: result.number[0],
                paid: true,
                status: "in_review",
              },
            },
            { new: true }
          ).then((e) => {
            console.log(result);
            console.log(result?.order_list);
            return resolve(result);
          });
        } else {
          const err =
            data?.aliexpress_trade_buy_placeorder_response?.result?.error_code;
          console.log(err);
          return reject(new AppError(err, 400));
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}
export const SendOrder = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    let { order_id, order_memo,CustomerData,shippingCurrIndex } = req.body;
    const order = await Order.findOne({ order_id });
    if (!order) {
      return next(new AppError("Order Not Found", 404));
    }
    if (order_memo) {
      order.order_memo = order_memo;
      await order.save();
    }
    const placeOrderResult = await PlaceOrder(order, order_memo,CustomerData,shippingCurrIndex);
    return res.json({ data: placeOrderResult });
  }
);


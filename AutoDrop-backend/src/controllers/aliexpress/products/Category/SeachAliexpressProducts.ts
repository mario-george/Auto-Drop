import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import AppError from "../../../../utils/appError";
import TokenUserExtractor from "../../../../utils/handlers/tokenUserExtractor";
import AliExpressToken from "../../../../models/AliExpressTokenModel";
import MakeRequest from "../../features/Request";

function generateRandomNumber(start: any, end: any) {
    // Generate a random decimal between 0 and 1
    var randomDecimal = Math.random();
  
    // Scale the random decimal to the desired range
    var randomInRange = randomDecimal * (end - start + 1);
  
    // Shift the range to start from the desired start number
    var randomInteger = Math.floor(randomInRange) + start;
  
    return randomInteger;
  }
export const GetRecommendedProductsByCategory = catchAsync(
    async (req: Request & any, res: Response, next: NextFunction) => {
      console.log(req.query);
      let user: any = await TokenUserExtractor(req);
      if (!user) return res.status(401).json({ message: "token is invalid" });
      let aliexpressToken = await AliExpressToken.findOne({ userId: user?._id });
      const { lang } = req.query;
      let result: any = [];
      let response = await MakeRequest(
        {
          method: "aliexpress.ds.feedname.get",
          sign_method: "sha256",
        },
        {
          aliExpressAccessToken: aliexpressToken?.accessToken,
          aliExpressRefreshToken: aliexpressToken?.refreshToken,
        }
      );
      let respData = response;
  
      while (result.length < 20) {
  
        const randomPage = generateRandomNumber(
          0,
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo.length - 1
        );
        const randomFeedName =
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo[randomPage].promo_name;
        console.log(randomFeedName);
        let response2 = await MakeRequest(
          {
            method: "aliexpress.ds.recommend.feed.get",
            target_currency: "SAR",
            country: "SA",
            feed_name: randomFeedName,
            // feed_name: "DS_Sports&Outdoors_bestsellers",
            target_language: lang,
            // page_no: req.body.page,
            page_size: 10,
            sign_method: "sha256",
            //
            // category_id: "7",
            //
          },
          {
            aliExpressAccessToken: aliexpressToken?.accessToken,
            aliExpressRefreshToken: aliexpressToken?.refreshToken,
          }
        );
        let resPage = response2;
        const products =
          resPage?.data.aliexpress_ds_recommend_feed_get_response?.result
            ?.products?.traffic_product_d_t_o;
  
        if (products) {
          result.push(...products);
          console.log(result.length);
        }
      }
      console.log(result.length);
  
      if (!result.length) throw new AppError("Products Not Found", 409);
      res.json({ result: result.slice(0, 20) });
    }
  );

  export const GetRecommendedProductsByProduct = catchAsync(
    async (req: Request & any, res: Response, next: NextFunction) => {
      console.log(req.query);
      let user: any = await TokenUserExtractor(req);
      if (!user) return res.status(401).json({ message: "token is invalid" });
      let aliexpressToken = await AliExpressToken.findOne({ userId: user?._id });
      const { lang } = req.query;
      let result: any = [];
      let response = await MakeRequest(
        {
          method: "aliexpress.ds.feedname.get",
          sign_method: "sha256",
        },
        {
          aliExpressAccessToken: aliexpressToken?.accessToken,
          aliExpressRefreshToken: aliexpressToken?.refreshToken,
        }
      );
      let respData = response;
  
      while (result.length < 20) {
  
        const randomPage = generateRandomNumber(
          0,
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo.length - 1
        );
        const randomFeedName =
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo[randomPage].promo_name;
        console.log(randomFeedName);
        let response2 = await MakeRequest(
          {
            method: "aliexpress.ds.recommend.feed.get",
            target_currency: "SAR",
            country: "SA",
            feed_name: randomFeedName,
            // feed_name: "DS_Sports&Outdoors_bestsellers",
            target_language: lang,
            // page_no: req.body.page,
            page_size: 10,
            sign_method: "sha256",
            //
            // category_id: "7",
            //
          },
          {
            aliExpressAccessToken: aliexpressToken?.accessToken,
            aliExpressRefreshToken: aliexpressToken?.refreshToken,
          }
        );
        let resPage = response2;
        const products =
          resPage?.data.aliexpress_ds_recommend_feed_get_response?.result
            ?.products?.traffic_product_d_t_o;
  
        if (products) {
          result.push(...products);
          console.log(result.length);
        }
      }
      console.log(result.length);
  
      if (!result.length) throw new AppError("Products Not Found", 409);
      res.json({ result: result.slice(0, 20) });
    }
  );

export const GetRecommendedProductsByImage = catchAsync(
    async (req: Request & any, res: Response, next: NextFunction) => {
      console.log(req.query);
      let user: any = await TokenUserExtractor(req);
      if (!user) return res.status(401).json({ message: "token is invalid" });
      let aliexpressToken = await AliExpressToken.findOne({ userId: user?._id });
      const { lang } = req.query;
      let result: any = [];
      let response = await MakeRequest(
        {
          method: "aliexpress.ds.feedname.get",
          sign_method: "sha256",
        },
        {
          aliExpressAccessToken: aliexpressToken?.accessToken,
          aliExpressRefreshToken: aliexpressToken?.refreshToken,
        }
      );
      let respData = response;
  
      while (result.length < 20) {
  
        const randomPage = generateRandomNumber(
          0,
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo.length - 1
        );
        const randomFeedName =
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo[randomPage].promo_name;
        console.log(randomFeedName);
        let response2 = await MakeRequest(
          {
            method: "aliexpress.ds.recommend.feed.get",
            target_currency: "SAR",
            country: "SA",
            feed_name: randomFeedName,
            // feed_name: "DS_Sports&Outdoors_bestsellers",
            target_language: lang,
            // page_no: req.body.page,
            page_size: 10,
            sign_method: "sha256",
            //
            // category_id: "7",
            //
          },
          {
            aliExpressAccessToken: aliexpressToken?.accessToken,
            aliExpressRefreshToken: aliexpressToken?.refreshToken,
          }
        );
        let resPage = response2;
        const products =
          resPage?.data.aliexpress_ds_recommend_feed_get_response?.result
            ?.products?.traffic_product_d_t_o;
  
        if (products) {
          result.push(...products);
          console.log(result.length);
        }
      }
      console.log(result.length);
  
      if (!result.length) throw new AppError("Products Not Found", 409);
      res.json({ result: result.slice(0, 20) });
    }
  );
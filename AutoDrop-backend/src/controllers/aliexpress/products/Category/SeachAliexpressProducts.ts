import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import AppError from "../../../../utils/appError";
import TokenUserExtractor from "../../../../utils/handlers/tokenUserExtractor";
import AliExpressToken from "../../../../models/AliExpressTokenModel";
import MakeRequest, { MakeRequestImage } from "../../features/Request";
import { extname, basename } from "path";
export async function GetProductId(url: string) {
  const { pathname }: URL = new URL(url);
  const filename = basename(pathname);
  const product_id = filename.replace(extname(filename), "");

  return product_id;
}
function generateRandomNumber(start: any, end: any) {
  var randomDecimal = Math.random();

  var randomInRange = randomDecimal * (end - start + 1);

  var randomInteger = Math.floor(randomInRange) + start;

  return randomInteger;
}
export const GetRecommendedProductsByURL = catchAsync(
  async (req: Request & any, res: Response, next: NextFunction) => {
    let { url } = req.body;

    let category_id = await GetProductId(url);
    // get first_level_category_id if not get second level
    // iterate through the feedname and get the products

    console.log("category_id", category_id);
    console.log("typeof category_id", typeof category_id);
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
      console.log(
        "respData.data.aliexpress_ds_feedname_get_response?.resp_result.result",
        respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
      );
      console.log(
        "respData.data.aliexpress_ds_feedname_get_response?.resp_result.result.promos.promo[0]",
        respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
          .promos.promo[0]
      );
      console.log(randomFeedName);
      let response2 = await MakeRequest(
        {
          method: "aliexpress.ds.recommend.feed.get",
          target_currency: "SAR",
          country: "SA",
          feed_name: randomFeedName,
          target_language: lang,
          // page_size: 10,
          sign_method: "sha256",

          category_id: category_id,
        },
        {
          aliExpressAccessToken: aliexpressToken?.accessToken,
          aliExpressRefreshToken: aliexpressToken?.refreshToken,
        }
      );
      let resPage = response2;
      // console.log(resPage)
      const products =
        resPage?.data.aliexpress_ds_recommend_feed_get_response?.result
          ?.products?.traffic_product_d_t_o;
      console.log(
        resPage?.data.aliexpress_ds_recommend_feed_get_response?.result
      );
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

export const GetRecommendedProductsByCategory = catchAsync(
  async (req: Request & any, res: Response, next: NextFunction) => {
    let { categoryName } = req.body;

    /*   const stationaryIds = [21, 34, 1420];
    const ElectronicsIds = [6, 44, 502];
    const sportsSuppliesIds = [18, 34, 1501];
    const AccessoriesIds = [44, 1501];
    const SmartDevices = [44, 509];
    const PerfumesIds = [66];
    const cosmeticProductsIds = [66];
    const ClothesIds = [3, 66, 1501];
    const DecorIds = [15, 39, 1503]; */
    const categories: any = {
      stationary: [21, 34, 1420],
      electronics: [6, 44, 502],
      sportsSupplies: [18, 34, 1501],
      accessories: [44, 1501],
      smartDevices: [44, 509],
      perfumes: [66],
      cosmeticProducts: [66],
      clothes: [3, 66, 1501],
      decor: [15, 39, 1503],
    };
    const currentCategory = categories[categoryName];
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

    let i = 0;
    let promosLength =
      respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
        .promos.promo.length - 1;
    while (result.length < 20 && i < promosLength) {
      let currFeedName =
        respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
          .promos.promo[i].promo_name;
      /* const randomPage = generateRandomNumber(
        0,
        respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
          .promos.promo.length - 1
      ); */
      const randomCategoryIdIndex = generateRandomNumber(
        0,
        currentCategory.length - 1
      );
      const randomCategoryId = currentCategory[randomCategoryIdIndex];
      /*    const randomFeedName =
        respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
          .promos.promo[randomPage].promo_name; */
      // console.log(randomFeedName);
      let response2 = await MakeRequest(
        {
          method: "aliexpress.ds.recommend.feed.get",
          target_currency: "SAR",
          country: "SA",
          feed_name: currFeedName,
          target_language: lang,
          page_size: 10,
          sign_method: "sha256",

          category_id: randomCategoryId,
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
      i += 1;
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

    let { imageBytes } = req.body;
    // console.log("imageBytes", imageBytes);
    let result: any = [];
    /*     let response = await MakeRequest(
      {
        method: "aliexpress.ds.image.search",
        sign_method: "sha256",
        shpt_to: "SA",
        image_file_bytes: imageBytes,
      },
      {
        aliExpressAccessToken: aliexpressToken?.accessToken,
        aliExpressRefreshToken: aliexpressToken?.refreshToken,
      }
    );
    let respData = response; */
    // const uint8Array = new Uint8Array(imageBytes);
    // const base64String = btoa(String.fromCharCode(...uint8Array));
    const uint8Array = new Uint8Array(/* Your data here */);
    const blob = new Blob([uint8Array], { type: "application/octet-stream" });
    while (result.length < 20) {
      /*  const randomPage = generateRandomNumber(
          0,
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo.length - 1
        );
        const randomFeedName =
          respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
            .promos.promo[randomPage].promo_name;
        console.log(randomFeedName); */
      let response2 = await MakeRequestImage(
        {
          shpt_to: "SA",
          target_currency: "SAR",
          product_cnt: 10,
          target_language: "EN",
          sort: "SALE_PRICE_ASC",
          method: "aliexpress.ds.image.search",
          sign_method: "sha256",
        },
        {
          aliExpressAccessToken: aliexpressToken?.accessToken,
          aliExpressRefreshToken: aliexpressToken?.refreshToken,
        },
        imageBytes
      );
      let resPage = response2;

      console.log("resPage", resPage);
      const products = resPage?.data?.products;

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

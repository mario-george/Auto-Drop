import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/appError";
import MakeRequest from "./features/Request";
import TokenUserExtractor from "../../utils/handlers/tokenUserExtractor";
import AliExpressToken from "../../models/AliExpressTokenModel";
import { getProductShippingServices } from "./features/shipping";
import { basename, extname } from "path";
import { pick, map, uniqBy, filter, uniq } from "lodash";
import slugify from "slugify";
import { ImageType, Product, ProductSchema } from "../../models/product.model";
import { v4 as uuid } from "uuid";
import fetchCategoryName from "./products/Category/FetchNameOfCategory";

function generateRandomNumber(start: any, end: any) {
  // Generate a random decimal between 0 and 1
  var randomDecimal = Math.random();

  // Scale the random decimal to the desired range
  var randomInRange = randomDecimal * (end - start + 1);

  // Shift the range to start from the desired start number
  var randomInteger = Math.floor(randomInRange) + start;

  return randomInteger;
}
export async function GetRecommendedProducts(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
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
  console.log(
    respData.data.aliexpress_ds_feedname_get_response?.resp_result.result.promos
      .promo[3]
  );
  while (result.length < 10) {
    const randomPage = generateRandomNumber(
      0,
      respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
        .promos.promo.length - 1
    );
    const randomFeedName =
      respData.data.aliexpress_ds_feedname_get_response.resp_result.result
        .promos.promo[randomPage].promo_name;
    console.log(randomFeedName);
    let response2 = await MakeRequest(
      {
        method: "aliexpress.ds.recommend.feed.get",
        target_currency: "SAR",
        country: "SA",
        // feed_name: randomFeedName,
        feed_name: "DS_Sports&Outdoors_bestsellers",
        target_language: lang,
        page_no: 1,
        page_size: 21,
        sign_method: "sha256",
      },
      {
        aliExpressAccessToken: aliexpressToken?.accessToken,
        aliExpressRefreshToken: aliexpressToken?.refreshToken,
      }
    );
    let resPage = response2;
    const products =
      resPage.data.aliexpress_ds_recommend_feed_get_response.result.products
        .traffic_product_d_t_o;

    if (products) {
      result.push(...products);
      console.log(result.length);
    }
  }
  console.log(result.length);

  if (!result.length) throw new AppError("Products Not Found", 409);
  res.json({ result });
}
export async function GetProductByName(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  console.log(req.query);
  let user: any = await TokenUserExtractor(req);
  if (!user) return res.status(401).json({ message: "token is invalid" });
  let aliexpressToken = await AliExpressToken.findOne({ userId: user?._id });
  const { lang } = req.query;
  let result: any = [];
  let response = await MakeRequest(
    {
      method: "aliexpress.ds.category.get",
      sign_method: "sha256",
      fields: "all",
      keywords: "shoes",
    },
    {
      aliExpressAccessToken: aliexpressToken?.accessToken,
      aliExpressRefreshToken: aliexpressToken?.refreshToken,
    }
  );
  let respData = response;
  console.log(respData);
  res.json({ response });
}
export async function GetRecommendedProductsPost(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
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
  console.log(
    respData.data.aliexpress_ds_feedname_get_response?.resp_result.result.promos
      .promo[3]
  );
  while (result.length < 20) {
    console.log(
      respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
        .promos.promo.length
    );
    const randomPage = generateRandomNumber(
      0,
      respData.data.aliexpress_ds_feedname_get_response?.resp_result.result
        .promos.promo.length - 1
    );
    const randomFeedName =
      respData.data.aliexpress_ds_feedname_get_response.resp_result.result
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
      resPage.data.aliexpress_ds_recommend_feed_get_response.result.products
        .traffic_product_d_t_o;

    if (products) {
      result.push(...products);
      console.log(result.length);
    }
  }
  console.log(result.length);

  if (!result.length) throw new AppError("Products Not Found", 409);
  res.json({ result: result.slice(0, 20) });
}
// two methods will be used
async function GetProductOptions(SKUs: object[]) {
  let quantities: number = 0,
    price: number = 0,
    options: any[] = [],
    concatValues: any[] = [],
    collectOptions: any[] = [],
    collectValues: any[] = [];

  collectValues = SKUs.map((sku: any) => {
    return sku?.ae_sku_property_dtos?.ae_sku_property_d_t_o?.map((ev: any) => {
      const {
        sku_image,
        sku_price,
        sku_stock,
        sku_code,
        sku_available_stock,
        offer_sale_price,
        id,
        sku_id,
      } = sku;
      const quantity = sku_available_stock > 100 ? 100 : sku_available_stock;

      quantities += parseFloat(quantity || 0);

      return {
        ...ev,
        sku_id,
        sku_image: ev.sku_image ? ev.sku_image : sku_image,
        sku_price,
        sku_stock,
        sku_code,
        quantity,
        id,
        offer_sale_price,
      };
    });
  });

  concatValues = await Promise.all(new Array().concat(...collectValues));
  collectOptions = uniq(map(concatValues, "sku_property_name"));
  let sku_image_1;

  options = await Promise.all(
    collectOptions
      .map((option: string, index: number) => {
        const uniqValues = uniqBy(
          concatValues
            ?.filter((val) => val?.sku_property_name === option)
            .map((e: any) => ({
              ...e,
              property_value_definition_name:
                e?.property_value_definition_name || e?.sku_property_value,
            })),
          "sku_property_value"
        );

        // console.log(uniqValues)
        const values = uniqValues?.map((val: any, idx: number) => {
          const isFirst = index == 0 && idx == 0;
          const {
            sku_image,
            property_value_definition_name,
            quantity,
            property_value_id,
            sku_property_id,
            id,
            sku_price,
            offer_sale_price,
          } = val;
          const valuePrice = parseFloat(sku_price);
          const offerPrice = parseFloat(offer_sale_price);
          const valPrice = valuePrice === offerPrice ? valuePrice : offerPrice;
          /*    const displayValue = slugify(property_value_definition_name, {
            lower: true,
          }); */
          let displayValue;

          if (property_value_definition_name) {
            displayValue = slugify(property_value_definition_name, {
              lower: true,
            });
          }
          sku_image_1 = sku_image;

          if (isFirst) {
            price = valPrice;
          }

          return {
            name: property_value_definition_name,
            price: valPrice,
            original_price: valPrice,
            quantity: quantity,
            is_default: isFirst,
            property_id: property_value_id,
            sku_id: val.sku_id,
            display_value: displayValue,
            sku: [sku_property_id, property_value_id].join(":"),
            id,
            sku_image,
          };
        });
        return {
          name: option,
          // display_type: sku_image_1 ? "image" : "text",
          display_type: "text",
          values,
        };
      })
      .filter((e) => e.name !== "Ships From")
  );

  return { price, quantities, options };
}

async function GetProductImages(URLs: string) {
  // const splitImages = ae_multimedia_info_dto?.image_urls?.split(";");
  const splitImages = URLs?.split(";");
  const images: ImageType[] = splitImages?.map((obj, index: number) => ({
    original: obj,
    thumbnail: obj,
    alt: "image " + index,
    default: false,
  }));

  return images;
}

//
export async function GetDetails({
  product_id,
  tokenInfo,
  first_level_category_name,
  second_level_category_name,
  target_sale_price,
  target_original_price,
}: {
  product_id: string;
  tokenInfo: any;
  first_level_category_name: string;
  second_level_category_name: string;
  target_sale_price: string;
  target_original_price: string;
}): Promise<any> {
  return new Promise((resolve, reject) => {
    MakeRequest(
      {
        ship_to_country: "SA",
        product_id: product_id,
        target_currency: "SAR",
        target_language: "AR",
        method: "aliexpress.ds.product.get",
        sign_method: "sha256",
      },
      tokenInfo
    )
      .then(async (response) => {
        const aeResponse = response?.data;
        const result = aeResponse?.aliexpress_ds_product_get_response?.result;
        const errorMessage =
          aeResponse?.error_response?.msg ||
          "There is something went wrong while getting product details or maybe this product is not available to shipping to SA, try another product or contact support.";
        // console.log(result);
        if (!result) return resolve(false);
        else {
          const {
            ae_item_sku_info_dtos,
            ae_item_base_info_dto,
            ae_multimedia_info_dto,
          } = result;

          const { subject, product_id, detail }: any =
            ae_item_base_info_dto || {};

          const { ae_item_sku_info_d_t_o: SKUs }: any =
            ae_item_sku_info_dtos || {};
            const variantsArr = SKUs.map((variant:any)=>{
              let obj:any={}
              let {offer_sale_price,sku_available_stock,id,sku_code,sku_id,sku_price,offer_bulk_sale_price,sku_stock}=variant
              obj.offer_sale_price=offer_sale_price
              obj.sku_available_stock=sku_available_stock
              obj.id=id
              obj.sku_code=sku_code
              obj.sku_id=sku_id
              obj.sku_price=sku_price
              obj.offer_bulk_sale_price=offer_bulk_sale_price
              obj.sku_stock=sku_stock
              
              let {ae_sku_property_dtos} = variant
              
              let relativeOptions:any =  ae_sku_property_dtos?.ae_sku_property_d_t_o?.map((e: any) => {
                return e
              })
              obj.relativeOptions=relativeOptions
              return obj
            })
          const [{ price, quantities, options }, images] = await Promise.all([
            GetProductOptions(SKUs || []),
            GetProductImages(ae_multimedia_info_dto?.image_urls),
          ]);

          const values = new Array().concat(
            ...options?.map((e: any) => e.values)
          );
          const hasValues = values.length;
          let targetSalePrice = Number(variantsArr[0].offer_sale_price) ||target_sale_price
          let targetOriginalPrice = Number(variantsArr[0].sku_price) ||target_original_price


          
          const data: ProductSchema = {
            name: subject,
            description: detail,
            price: price,
            main_price: price,
            quantity: quantities,
            sku: uuid(),
            images: images
              ?.slice(0, 10)
              ?.map((img: ImageType, index: number) => ({
                ...img,
                default: index === 0,
              })),
            options: options,
            metadata_title: subject.substring(0, 70),
            metadata_description: subject,
            product_type: "product",
            original_product_id: product_id,
            merchant: "",
            salla_product_id: "",
            vendor_commission: 0,
            vendor_price: 0,
            require_shipping: true,
            shipping: { name: "default", price: 0 },
            sku_id: SKUs[0].sku_id,
            vat: false,
            category_id: ae_item_base_info_dto.category_id,
            first_level_category_name,
            second_level_category_name,
            target_sale_price:targetSalePrice,
            target_original_price:targetOriginalPrice,
            variantsArr
          };
          // console.log(data.category_id);

          /*  let category_name = await fetchCategoryName({
            category_id: data.category_id,
            metadata_title: data.metadata_title,
            original_product_id: data.original_product_id,
            tokenInfo,
          }); */
          //@ts-ignore
          /*   data.category_name = category_name;
          console.log("cat name", category_name);
          console.log(category_name);
          console.log(category_name); */
          const product = new Product(data).toJSON();
          resolve(product);
        }
      })
      .catch((error: AppError | any) => {
        const err = error?.response?.data;
        console.log(error);
        reject(new AppError("InternalServerError", err));
      });
  });
}
export async function GetProductId(url: string) {
  const { pathname }: URL = new URL(url);
  const filename = basename(pathname);
  const product_id = filename.replace(extname(filename), "");

  return product_id;
}
export async function GetProductDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      url,
      first_level_category_name,
      second_level_category_name,
      target_sale_price,
      target_original_price,
    } = req.body;
    let user: any = await TokenUserExtractor(req);
    if (!user) return res.status(401).json({ message: "token is invalid" });
    let aliexpressToken = await AliExpressToken.findOne({ userId: user?._id });
    let tokenInfo = {
      aliExpressAccessToken: aliexpressToken?.accessToken,
      aliExpressRefreshToken: aliexpressToken?.refreshToken,
    };
    const product_id = await GetProductId(url);
    /*     if (userType === "vendor")
      await CheckSubscription(user_id, "products_limit"); */

    const product = await GetDetails({
      product_id,
      tokenInfo,
      first_level_category_name,
      second_level_category_name,
      target_sale_price,
      target_original_price,
    });
    const result = await getProductShippingServices(
      {
        sku_id: product.sku_id,
        country_code: "SA",
        product_id,
        product_num: "1",
        price_currency: "SAR",
      },
      tokenInfo
    );
    /*  console.log(result);
    console.log(product); */
    return res.json({ product, shipping: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

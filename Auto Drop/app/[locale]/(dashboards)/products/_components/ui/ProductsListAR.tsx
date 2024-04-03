import { Card } from "@/components/ui/card";
import { FetchSpinner } from "../ProductsSpinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import MotionWrapperExit from "../../../_components/shared/MotionWrapperExit";
import MotionWrapper from "../../../_components/shared/MotionWrapper";
import CurrencyFormatter from "../CurrencyFormatter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import renderRatingStars from "../RenderRatingStarts";
import CartSVG from "../../../../../../public/client/products/CartSVG";

export default function ProductsListAR({
  productsAR,
  productsShippingInfo,
  handleCheckChangeAR,
  locale,
  lang,
  showShippingForProduct,
  showShippingHandler,
}: any) {
  return (
    <>
      {" "}
      <MotionWrapper locale="ar">
        <div className="productsContainerGrid">
          {productsAR?.map((product: any, i: number) => {
            let newShippingInfoActive =
              productsShippingInfo &&
              productsShippingInfo[i] &&
              productsShippingInfo[i][0].activated &&
              showShippingForProduct?.[i];
            let newShippingInfoPending =
              productsShippingInfo &&
              productsShippingInfo[i] &&
              productsShippingInfo[i][0].loading === "pending" &&
              showShippingForProduct?.[i];

            return (
              <Card
                className="relative flex flex-col !p-0 my-3 shadow-md rounded-lg justify-between overflow-hidden dark:bg-[#2e464f]"
                key={i}
              >
                {newShippingInfoPending && <FetchSpinner />}
                {newShippingInfoActive ? (
                  <>
                    <MotionWrapperExit locale="en">
                      <div className="text-[#253439]  tab:text-sm " dir="rtl">
                        <div className="shippingMethodsTitle  ">
                          معلومات و طرق الشحن للمنتج{" "}
                        </div>
                        <ScrollArea className="scrollAreaShipping ">
                          {productsShippingInfo[i].map(
                            (shipping: any, ind: number) => {
                              if (shipping.noShipping) {
                                return (
                                  <div
                                    dir="rtl"
                                    key={ind}
                                    className="shippingInfoInnerContainer"
                                  >
                                    <div className="flex space-s-3">
                                      <span>نوع الشحن:</span>
                                      <span className="text-[#008767]">
                                        لا يوجد شحن متوفر.
                                      </span>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <>
                                  <div
                                    dir="rtl"
                                    key={ind}
                                    className="shippingInfoInnerContainer"
                                  >
                                    <div className="flex space-s-3">
                                      <span>نوع الشحن:</span>
                                      <span className="text-[#008767]">
                                        {shipping.shippingType}{" "}
                                      </span>
                                    </div>
                                    <div className="flex space-s-3">
                                      {" "}
                                      <span>المدة:</span>{" "}
                                      <span className="text-[#008767]">
                                        {shipping.duration}
                                      </span>
                                    </div>

                                    <div className="flex space-s-3 text-[#C1121F]">
                                      {" "}
                                      <span>السعر:</span>{" "}
                                      <span>
                                        {CurrencyFormatter(shipping.price)}
                                      </span>{" "}
                                    </div>
                                    {ind !==
                                      productsShippingInfo[i].length - 1 && (
                                      <Separator />
                                    )}
                                  </div>
                                </>
                              );
                            }
                          )}
                        </ScrollArea>
                      </div>
                    </MotionWrapperExit>
                  </>
                ) : (
                  <>
                    <div className="tab:max-h-[19rem] overflow-hidden">
                      <Image
                        src={
                          product.product_small_image_urls?.productSmallImageUrl?.[0]||  product.product_main_image_url
                        }
                        className="p-0 w-full min-h-[67.5%] mb-auto "
                        height={300}
                        width={300}
                        alt="aliexpressProduct"
                      />
                    </div>
                    <div className="productsCard">
                      <div
                        className={`flex justify-between gap-x-2 items-center`}
                      >
                        <div
                          className={`flex justify-between w-full items-center`}
                        >
                          <div
                            className={` text-[#253439] text-xs dark:text-white`}
                          >
                            {product?.product_title?.substring(0, 25)}
                            ...
                          </div>
                          <div>
                            <CartSVG />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex justify-between items-center w-full`}
                      >
                        <div className={`flex space-s-2 items-center`}>
                          <span className="text-xs">
                            {CurrencyFormatter(product.target_sale_price)}
                          </span>
                          {product.target_original_price !==
                          product.target_sale_price ? (
                            <span className="productsOriginalPriceText" >
                              {CurrencyFormatter(product.target_original_price)}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className={`flex justify-between items-center`}>
                        <div className="flex flex-1 z-10">
                          {product.evaluate_rate
                            ? renderRatingStars(
                                product.evaluate_rate.split("%")[0]
                              )
                            : renderRatingStars(90)}
                        </div>
                        <a
                          href={product.product_detail_url}
                          target="_blank"
                          className=" "
                        >
                          <Image
                            src={`/client/products/aliexpressCard.svg`}
                            width={66}
                            height={21}
                            alt="aliexpressCard"
                          />
                        </a>
                      </div>
                    </div>
                  </>
                )}
                <div
                  className={cn(
                    "shippingCartIcon ",
                    locale == "ar"
                      ? `right-[1rem]`
                      : `left-3 tab:left-2 k4:left-[1rem]`
                  )}
                >
                  <div
                    className="overflow-hidden"
                    onClick={() => {
                      showShippingHandler(i);
                    }}
                  >
                    <Image
                      src={`/client/products/shoppingCart.svg`}
                      className=" shippingCartIconImage "
                      height={45}
                      width={45}
                      alt="shippingCart"
                    />
                  </div>
                </div>
                {!showShippingForProduct?.[i] && (
                  <div
                    className={
                      (cn("absolute top-[10rem] left-[6rem]"),
                      locale == "aar" ? `right-[10%]` : `left-[10%]`)
                    }
                  >
                    <Checkbox
                      checked={product.checked || false}
                      onCheckedChange={() => handleCheckChangeAR(i)}
                      classNameIndicator="bg-blue-500 overflow-hidden"
                      className={cn(
                        "absolute top-[5%]  tab:h-[18px] tab:w-[18px] overflow-hidden border-black border-2 shadow-lg",
                        locale == "ar" ? `left-[5%]` : `right-[5%]`
                      )}
                    />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </MotionWrapper>
    </>
  );
}

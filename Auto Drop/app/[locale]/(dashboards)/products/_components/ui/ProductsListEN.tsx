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

export default function ProductsListEN({
  products,
  productsShippingInfo,
  handleCheckChange,
  locale,
  showShippingForProduct,
  showShippingHandler,
}: any) {
  console.log("showShippingForProduct", showShippingForProduct);
  console.log("productsShippingInfo", productsShippingInfo);
  return (
    <>
      {" "}
      <MotionWrapper locale="en">
        <div className="productsContainerGrid">
          {products?.map((product: any, i: number) => {
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
                      <div className="text-[#253439] tab:text-sm  " dir="ltr">
                        <div className="shippingMethodsTitle ">
                          Information and shipping methods for the product
                        </div>
                        <ScrollArea className="scrollAreaShipping">
                          {productsShippingInfo[i].map(
                            (shipping: any, ind: number) => {
                              console.log(
                                "shipping?.noShipping",
                                shipping?.noShipping
                              );
                              if (shipping.noShipping) {
                                return (
                                  <div
                                    key={ind}
                                    className="flex flex-col space-y-2 pl-2 mt-6"
                                  >
                                    <div className="flex space-s-3">
                                      <span>Shipping Method:</span>
                                      <span className="text-[#008767]">
                                        No Shipping Found.
                                      </span>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <>
                                  <div
                                    key={ind}
                                    className="flex flex-col space-y-2 pl-2 mt-6 "
                                  >
                                    <div className="flex space-s-3">
                                      <span>Shipping Method:</span>
                                      <span className="text-[#008767]">
                                        {shipping.shippingType}{" "}
                                      </span>
                                    </div>
                                    <div className="flex space-s-3">
                                      {" "}
                                      <span>Duration:</span>{" "}
                                      <span className="text-[#008767]">
                                        {shipping.duration}
                                      </span>
                                    </div>

                                    <div className="flex space-s-3 text-[#C1121F]">
                                      {" "}
                                      <span>Price:</span>{" "}
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
                          product.product_small_image_urls
                            .productSmallImageUrl[0]
                        }
                        className="p-0 w-full min-h-[67.5%] mb-auto   "
                        height={300}
                        width={300}
                        alt="aliexpressProduct"
                      />
                    </div>

                    <div className="productsCard">
                      <div
                        className=" flex items-center justify-between"
                        dir="ltr"
                      >
                        <div
                          className={` text-[#253439] dark:text-white text-xs `}
                        >
                          {product.product_title.substring(0, 35)}
                          ...
                        </div>
                        <div>
                          <CartSVG />
                        </div>
                      </div>

                      <div
                        className={`flex justify-between items-center w-full `}
                      >
                        <div className={`flex gap-x-2 items-center w-11/12 `}>
                          <span className="text-sm text-[#253439] dark:text-white">
                            {CurrencyFormatter(product.target_sale_price)}
                          </span>
                          {product.target_original_price !==
                          product.target_sale_price ? (
                            <span className="text-xs text-[#d64d57] line-through">
                              {CurrencyFormatter(product.target_original_price)}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div
                        className={`flex justify-between items-center `}
                        dir="ltr"
                      >
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
                    locale == "ar" ? `right-[1rem]` : `left-[1rem]`
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
                      className="shippingCartIconImage"
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
                      onCheckedChange={() => handleCheckChange(i)}
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

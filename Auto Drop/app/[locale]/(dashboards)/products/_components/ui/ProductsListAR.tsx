import { Card } from "@/components/ui/card";
import { FetchSpinner } from "../ProductsSpinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import MotionWrapperExit from "../../../_components/shared/MotionWrapperExit";
import MotionWrapper from "../../../_components/shared/MotionWrapper";
import CurrencyFormatter, {
  CurrencyFormatterShippingInfo,
} from "../CurrencyFormatter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiSend } from "react-icons/bi";
import renderRatingStars from "../RenderRatingStarts";

export default function ProductsListAR({
  productsAR,
  productsShippingInfo,
  toggleShoppingCartActivated,
  handleCheckChangeAR,
  locale,
  shippingInfoPending,
  commissionV,
  setCommissionV,
  addCommissionHandler,
  lang,
  showShippingForProduct,
  showShippingHandler,
}: any) {
  console.log("productsShippingInfoAR", productsShippingInfo);
  return (
    <>
      {" "}
      <MotionWrapper locale="ar">
        <div className="productsContainerGrid">
          {productsAR?.map((product: any, i: number) => {
            let shippingInfoActive =
              productsShippingInfo &&
              productsShippingInfo.length == productsAR.length &&
              productsShippingInfo[i] &&
              productsShippingInfo[i][0] &&
              productsShippingInfo[i][0].activated;
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
                className="relative flex flex-col !p-0 my-3 shadow-md rounded-lg justify-between overflow-hidden "
                key={i}
              >
                {newShippingInfoPending && <FetchSpinner />}
                {newShippingInfoActive ? (
                  <>
                    <MotionWrapperExit locale="en">
                      <div className="text-[#253439]" dir="rtl">
                        <div className="mx-auto bg-[#f0f3f4] text-center pt-16 p-6   ">
                          معلومات و طرق الشحن للمنتج{" "}
                        </div>
                        <ScrollArea className="h-[14rem] mm:h-[17rem] ml:h-[10rem] tab:h-[10rem] ">
                          {productsShippingInfo[i].map(
                            (shipping: any, ind: number) => {
                              if (shipping.noShipping) {
                                return (
                                  <div
                                    key={ind}
                                    className="flex flex-col space-y-2 pl-2 mt-6"
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
                                    className="flex flex-col space-y-2 pl-2 mt-6 "
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
                    <div className="">
                      <Image
                        src={
                          product.product_small_image_urls
                            .productSmallImageUrl[0]
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
                          <span
                            className={`w-fit text-[#253439] text-xs dark:text-white ${
                              lang === "ar" && "text-right "
                            }`}
                          >
                            {lang === "en"
                              ? product.product_title.substring(0, 25)
                              : product.product_title.substring(0, 35)}
                            ...
                          </span>
                          <div>
                            <Image
                              src={"/client/products/cart.svg"}
                              alt={`cart`}
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex justify-between items-center w-full`}
                      >
                        <div className={`flex space-x-2 items-center `}>
                          <span className="text-sm">
                            {CurrencyFormatter(product.target_sale_price)}
                          </span>
                          {product.target_original_price !==
                          product.target_sale_price ? (
                            <span className="text-xs text-[#c2464f] line-through text-[12px]">
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
                    "absolute top-[1rem] ",
                    locale == "ar" ? `right-[1rem]` : `left-[1rem]`
                  )}
                >
                  <div
                    className="overflow-hidden"
                    onClick={() => {
                      /*   if (
                        product.checked &&
                        (product.vendor_commission || product.vendor_commission === 0)
                      ) {
                        toggleShoppingCartActivated(i);
                      } */
                      showShippingHandler(i);
                    }}
                  >
                    <Image
                      src={`/client/products/shoppingCart.svg`}
                      className=" rounded-full cursor-pointer "
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
                {/*       {!shippingInfoActive && (
                  <div className="">
                    <Image
                      src={
                        product.product_small_image_urls.productSmallImageUrl[0]
                      }
                      className="p-0 w-full min-h-[67.5%] mb-auto "
                      height={300}
                      width={300}
                      alt="aliexpressProduct"
                    />
                  </div>
                )} */}

                {/*     {product.checked && !shippingInfoActive ? (
                  <>
                    <div className="space-y-3 flex flex-col pt-7">
                      <span className="mx-auto">من فضلك أدخل عمولتك. </span>
                      <div className="flex space-x-3 items-center justify-between px-3 pb-2">
                        <Button
                          className="bg-blue-500 text-white hover:bg-blue-600 rounded-full "
                          onClick={() => {
                            addCommissionHandler(i, product, commissionV[i]);
                          }}
                          disabled={shippingInfoPending}
                        >
                          <BiSend />
                        </Button>
                        <div className="relative mt-auto">
                          <Input
                            type="number"
                            className="pr-6"
                            value={commissionV[i]}
                            onChange={(e: any) => {
                              const newValues = [...commissionV];
                              newValues[i] = e.target.value;
                              setCommissionV(newValues);
                            }}
                          />
                          <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : shippingInfoActive ? (
                  <></>
                ) : (
                  <div className="p-3 flex flex-col  gap-y-3">
                    <div
                      className={`flex justify-between gap-x-2 items-center`}
                    >
                      <div
                        className={`flex justify-between w-full items-center`}
                      >
                        <span
                          className={`w-fit text-[#253439] text-xs ${
                            lang === "ar" && "text-right "
                          }`}
                        >
                          {lang === "en"
                            ? product.product_title.substring(0, 25)
                            : product.product_title.substring(0, 35)}
                          ...
                        </span>
                        <div>
                          <Image
                            src={"/client/products/cart.svg"}
                            alt={`cart`}
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center w-full`}>
                      <div className={`flex space-x-2 items-center `}>
                        <span className="text-sm">
                          {CurrencyFormatter(product.target_sale_price)}
                        </span>
                        {product.target_original_price !==
                        product.target_sale_price ? (
                          <span className="text-xs text-[#c2464f] line-through text-[12px]">
                            {CurrencyFormatter(product.target_original_price)}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex justify-between items-center ${
                        lang === "ar" && "flex-row-reverse "
                      }`}
                    >
                      <div className="flex flex-1 z-30">
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
                )} */}
              </Card>
            );
          })}
        </div>
      </MotionWrapper>
    </>
  );
}

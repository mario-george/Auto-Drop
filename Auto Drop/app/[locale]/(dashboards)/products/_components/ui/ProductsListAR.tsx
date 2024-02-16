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
  addCommissionHandler,lang
}: any) {
  return (
    <>
      {" "}
      <MotionWrapper locale='ar'>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-3 overflow-hidden">
            {productsAR?.map((product: any, i: number) => {
              return (
                <Card
                  className="relative flex flex-col !p-0 my-3 shadow-md rounded-lg justify-between overflow-hidden"
                  key={i}
                >
                  <div
                    className={cn(
                      "absolute top-[1rem] ",
                      locale == "ar" ? `right-[1rem]` : `left-[1rem]`
                    )}
                  >
                    <div className="overflow-hidden">
                      <Image
                        src={`/client/products/shoppingCart.svg`}
                        className=" rounded-full cursor-pointer "
                        height={45}
                        width={45}
                        alt="shoppingCart"
                      />
                    </div>
                  </div>

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
                </Card>
              );
            })}
          </div></MotionWrapper>
    </>
  );
}

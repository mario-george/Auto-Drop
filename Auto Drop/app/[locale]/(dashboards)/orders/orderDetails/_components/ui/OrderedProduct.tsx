import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";
import { Button } from "@chakra-ui/react";
import HeaderText from "../../../../wallet/_components/HeaderText";
import VectorSVG from "../images/VectorSVG";
import SendOrderSVG from "../images/SendOrderSVG";
import HeaderTwoPartSection from "../../../../_components/shared/ui/HeaderTwoPartsSection";

interface OrderedProductProps {
  image: string;
  prodName: string | any;
  originalPrice: number;
  originalPriceText: string;
  displayedPrice: number;
  displayedPriceText: string;
  sku: string;
  skuText: string;
  quantityText: string;
  quantity: number;
  options: { optionName: string; valueName: string }[];
}
interface OrderDetailsHeaderProps {
  orderDetails: string;
  order_id: string | number;
  orderNumberText: string;
  locale: string;
  orderAfterSendActive:boolean
}
interface StatusDetailsHeaderProps {
  orderStatus: string;
  order_id: string | number;
  orderNumberText: string;
  locale: string;

}
export default function OrderedProduct(props: OrderedProductProps) {
  let {
    image,
    prodName,
    originalPrice,
    originalPriceText,
    displayedPrice,
    displayedPriceText,
    sku,
    skuText,
    quantityText,
    quantity,
    options,
  } = props;

  prodName = prodName.slice(0, 50).split(" ");

  prodName = prodName.slice(0, prodName.length - 1).join(" ");

  return (
    <>
      <RoundedCardWrapper>
        <div className="flex flex-col space-y-3 tab:space-y-0 tab:flex-row  tab:justify-between tab:space-s-3 px-5 py-5">
          <Image
            alt="order-product"
            src={image}
            width={150}
            height={150}
            className="rounded-xl"
          />
          <div className="flex flex-col space-y-3 w-full ">
            <div className="twoPartSection">
              <p>{prodName}</p>

              <div className="flex space-s-2">
                <p>{skuText}:</p>
                <p>{sku}</p>
              </div>
            </div>
            <Separator />
            <div className="twoPartSection">
              <div className="flex space-s-2">
                <p>{originalPriceText}:</p>
                <p>{CurrencyFormatter(originalPrice)}</p>
              </div>

              <div className="flex space-s-2">
                <p>{displayedPriceText}:</p>
                <p>{CurrencyFormatter(displayedPrice)}</p>
              </div>
            </div>
            <Separator />
            <div className="twoPartSection">
              <div className="flex space-s-5">
                {options?.map(
                  (option: { optionName: string; valueName: string },ind:number) => {
                    return (
                      <div className="flex space-s-2" key={ind}>
                        <div>{option.optionName}</div>
                        <div>{option.valueName}</div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex space-s-2">
                <p>{quantityText}:</p>
                <p>{quantity}</p>
              </div>
            </div>

            <Separator />
          </div>
        </div>
      </RoundedCardWrapper>
    </>
  );
}
export function OrderDetailsHeader(props: OrderDetailsHeaderProps) {
  let { orderDetails, locale, orderNumberText, order_id } = props;
  let isAr = locale === "ar";
  let secondElement = (
    <div className="flex space-s-6 ">
      <div className="bg-white shadow rounded-xl px-4 py-2">
        <VectorSVG />
      </div>
      <div className="bg-white shadow rounded-xl flex space-s-4 px-4 py-2 items-center text-xs tab:text-sm dark:text-[#253439]">
        <div>{orderNumberText}</div>
        <div>#{order_id}</div>
      </div>
    </div>
  );
  return (
    <>
      <HeaderTwoPartSection
        isAr={locale == "ar"}
        title={orderDetails}
        secondElement={secondElement}
      />

    </>
  );
}
export function StatusDetailsHeader(props: StatusDetailsHeaderProps) {
  let { orderStatus, locale, orderNumberText, order_id } = props;
  let isAr = locale === "ar";
  let secondElement = (
    <div className="flex space-s-6 ">
      <div className="bg-white shadow rounded-xl px-4 py-2">
        <VectorSVG />
      </div>
      <div className="bg-white shadow rounded-xl flex space-s-4 px-4 py-2 items-center text-xs tab:text-sm">
        <div>{orderNumberText}</div>
        <div>#{order_id}</div>
      </div>
    </div>
  );
  return (
    <>
      <HeaderTwoPartSection
        isAr={locale == "ar"}
        title={orderStatus}
        secondElement={secondElement}
      />

    </>
  );
}
export function SendOrderButton(props: {
  sendOrderText: string;
  isAr: boolean;
  sendOrderHandler : ()=>void
}) {
  let { sendOrderText, isAr ,sendOrderHandler} = props;
  return (
    <div className="my-3 flex justify-center ">
      <Button className="flex space-s-2 !bg-[#253439] !text-white dark:!bg-white dark:!text-[#253439]" onClick={sendOrderHandler}>
        <p>{sendOrderText}</p>
        <p>
          <SendOrderSVG isAr={isAr || false} />
        </p>
      </Button>
    </div>
  );
}

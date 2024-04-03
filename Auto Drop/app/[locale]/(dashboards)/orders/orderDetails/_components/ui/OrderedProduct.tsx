import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";
import { Button } from "@chakra-ui/react";
import HeaderText from "../../../../wallet/_components/HeaderText";
import VectorSVG from "../images/VectorSVG";

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
  order_id: string|number;
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
            <div className="flex justify-between">
              <p>{prodName}</p>

              <div className="flex space-s-2">
                <p>{skuText}:</p>
                <p>{sku}</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between">
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
            <div className="flex justify-between">
              <div className="flex space-s-5">
                {options.map(
                  (option: { optionName: string; valueName: string }) => {
                    return (
                      <div className="flex space-s-2">
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
  return (
    <>
      <div className="flex flex-col mm:flex-row space-y-2 mm:space-y-0 mm:justify-between items-center">
        <HeaderText title={orderDetails} isAr={isAr} />
        <div className="flex space-s-6">
          <div className="bg-white shadow rounded-xl px-4 py-2">
            <VectorSVG />
          </div>
          <div className="bg-white shadow rounded-xl flex space-s-4 px-4 py-2">
            <div>{orderNumberText}</div>
            <div>#{order_id}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SendOrderButton(props: { sendOrderText: string }) {
  let { sendOrderText } = props;
  return (
    <div className="my-3">
      <Button>{sendOrderText}</Button>
    </div>
  );
}
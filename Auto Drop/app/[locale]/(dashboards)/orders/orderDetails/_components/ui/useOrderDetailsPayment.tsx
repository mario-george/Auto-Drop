import { sectionHeader } from "./useOrderDetailsShipping";
import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import CurrencyFormatter from "../../../../products/_components/CurrencyFormatter";
import { Button } from "@chakra-ui/react";
import HeaderText from "@/app/[locale]/(dashboards)/wallet/_components/HeaderText";
interface OrderDetailsPayment {
  paymentProcess: string;
  total: any;
  cod: string;
  locale: string;
  paymentFromWallet: string;
  payNow: string;
  totalPrice: number;
}
interface PaymentButtonProps {
  name: string;
  className: string;
  onClick: () => void;
}
export default function useOrderDetailsPayment({
  payNow,
  total,
  locale,
  paymentProcess,
  paymentFromWallet,
  cod,
  totalPrice,
}: OrderDetailsPayment) {
  // order-memo
  let paymentButtons = [
    {
      name: cod,
      className: "!bg-white !text-black !shadow",
      onClick: () => {},
    },
    {
      name: paymentFromWallet,
      className: "!bg-[#253439] !text-white !shadow",
      onClick: () => {},
    },
    {
      name: payNow,
      className: "!bg-[#B29E84] !text-white !shadow ",
      onClick: () => {},
    },
  ];
  let OrderPayment = (
    <>
      <HeaderText isAr={locale == "ar"} title={paymentProcess} />
      <RoundedCardWrapper>
        <div className="flex flex-col my-3 gap-y-3 px-3">
          <div className="flex justify-between">
            <p>{total}</p>
            <p>{CurrencyFormatter(totalPrice)}</p>
          </div>
        </div>
      </RoundedCardWrapper>
      <div className="flex flex-col tab:flex-row space-y-3 tab:space-y-0 tab:gap-10 text-xs tab:text-sm my-3">
        {paymentButtons.map((button: PaymentButtonProps,ind:number) => {
          return (
            <Button
              className={
                button.className +
                " flex-1 !text-xs tab:!text-sm !py-2 !mx-3 tab:py-0 tab:!mx-0 !whitespace-wrap"
              }
              onClick={button.onClick}
           key={ind}
           >
              {button.name}
            </Button>
          );
        })}
      </div>
    </>
  );
  return { OrderPayment };
}

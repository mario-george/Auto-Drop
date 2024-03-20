"use client";
import { useErrorToast } from "@/components/chakra-ui/useErrorToast";
import useProfitTypeHandler from "./useProfitTypeHandler";
import { useRef } from "react";
export default function Header({
  upProducts,
  val,
  percentage,
  profitType,
  number,
  title,
  className,
}: {
  upProducts: string;
  val: string;
  number: string;
  percentage: string;
  profitType: string;
  title: string;
  className?: string;
}) {
  const errorButtonRefNoSelection = useRef<HTMLButtonElement>(null);
  const errorButtonRefNoToken = useRef<HTMLButtonElement>(null);
  const errorButtonRefSubmitError = useRef<HTMLButtonElement>(null);
  const {ErrorComponent:ErrorComponentNoSelection}  = useErrorToast({title:"Error",description:"No product was selected please try again.",errorButtonRef:errorButtonRefNoSelection})
  const {ErrorComponent:ErrorComponentNoToken}  = useErrorToast({title:"Error",description:"Please link your account with salla and try again.",errorButtonRef:errorButtonRefNoToken})
  const {ErrorComponent:ErrorComponentSubmitError}  = useErrorToast({title:"Error",description:"Error while linking product.",errorButtonRef:errorButtonRefSubmitError})
  const { ProfitComponent, LoaderComponent } = useProfitTypeHandler({
    upProducts,
    val,
    percentage,
    profitType,
    number,errorButtonRefNoSelection,errorButtonRefNoToken,errorButtonRefSubmitError
  });
  return (
    <>
      {/* {LoaderComponent} */}

      {ErrorComponentNoSelection}
      {ErrorComponentNoToken}
      {ErrorComponentSubmitError}
      <div className="flex flex-col tab:flex-row justify-between tab:max-w-[90%] px-3 my-3 items-center">
        <div className={`flex tab:text-[30px] text-[#253439] ${className}`}>
          {title}
        </div>{" "}
        <div>{ProfitComponent}</div>
      </div>
    </>
  );
}

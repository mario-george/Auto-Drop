"use client";
import { useErrorToast } from "@/components/chakra-ui/useErrorToast";
import useProfitTypeHandler from "./useProfitTypeHandler";
import { useRef } from "react";
import { useSuccessToast } from "@/components/chakra-ui/useSuccessToast";
export default function Header({
  upProducts,
  val,
  percentage,
  profitType,
  number,
  title,
  className,
  translationMessages,
  category,
}: {
  upProducts: string;
  val: string;
  number: string;
  percentage: string;
  profitType: string;
  title: string;
  className?: string;
  translationMessages?: {[key:string]:string};
  category?: string;
}) {
  const errorButtonRefNoSelection = useRef<HTMLButtonElement>(null);
  const errorButtonRefNoToken = useRef<HTMLButtonElement>(null);
  const errorButtonRefSubmitError = useRef<HTMLButtonElement>(null);
  const successButtonRef = useRef<HTMLButtonElement>(null);

  const { ErrorComponent: ErrorComponentNoSelection } = useErrorToast({
    title: "Error",
    description: "No product was selected please try again.",
    errorButtonRef: errorButtonRefNoSelection,
  });
  const { ErrorComponent: ErrorComponentNoToken } = useErrorToast({
    title: "Error",
    description: "Please link your account with salla and try again.",
    errorButtonRef: errorButtonRefNoToken,
  });
  const { ErrorComponent: ErrorComponentSubmitError } = useErrorToast({
    title: "Error",
    description: "Error while linking product.",
    errorButtonRef: errorButtonRefSubmitError,
  });
  const { SuccessComponent: SuccessComponent } = useSuccessToast({
    title: "Success",
    description: "Products have been linked successfully.",
    successButtonRef: successButtonRef,
  });
  const { ProfitComponent, LoaderComponent } = useProfitTypeHandler({
    upProducts,
    val,
    percentage,
    profitType,
    number,
    errorButtonRefNoSelection,
    errorButtonRefNoToken,
    errorButtonRefSubmitError,
    successButtonRef,translationMessages,category
  });
  return (
    <>
      {/* {LoaderComponent} */}

      {ErrorComponentNoSelection}
      {ErrorComponentNoToken}
      {ErrorComponentSubmitError}
      {SuccessComponent}
      <div className="flex flex-col tab:flex-row tab:max-w-[90%] justify-between px-3 my-3 items-center">
        <div
          className={`flex tab:text-[30px] text-[#253439] dark:text-white ${className}`}
        >
          {title}
        </div>{" "}
        <div className="">{ProfitComponent}</div>
      </div>
    </>
  );
}

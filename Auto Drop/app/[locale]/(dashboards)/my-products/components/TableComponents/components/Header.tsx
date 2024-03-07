"use client";
import useProfitTypeHandler from "./useProfitTypeHandler";
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
  const { ProfitComponent,LoaderComponent } = useProfitTypeHandler({
    upProducts,
    val,
    percentage,
    profitType,
    number,
  });
  return (
    <>
    {LoaderComponent}
      <div className="flex justify-between max-w-[90%] px-3 my-3 items-center">
        <div className={`flex tab:text-[30px] text-[#253439] ${className}`}>
          {title}
        </div>{" "}
        <div>{ProfitComponent}</div>
      </div>
    </>
  );
}

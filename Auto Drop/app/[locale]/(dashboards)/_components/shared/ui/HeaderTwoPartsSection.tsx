import React from "react";

export default function HeaderTwoPartSection({
  title,
  secondElement,
  isAr,
}: {
  isAr?: boolean;
  title: string;
  secondElement: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={`text-lg my-3 tab:text-xl flex flex-col space-y-3 tab:space-y-0 tab:flex-row  text-[#253439] dark:text-white tab:justify-between `}
      >
        <div>{title}</div>
        <div>{secondElement}</div>
      </div>
    </div>
  );
}
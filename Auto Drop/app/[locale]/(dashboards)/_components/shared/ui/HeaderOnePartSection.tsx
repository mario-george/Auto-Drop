import React from "react";

export default function HeaderOnePartSection({
  title,
  isAr,
}: {
  isAr?: boolean;
  title: string;
}) {
  return (
    <div>
      <div
        className={`text-lg tab:text-xl my-3 text-[#253439] dark:text-white `}
      >
        <div>{title}</div>
      </div>
    </div>
  );
}

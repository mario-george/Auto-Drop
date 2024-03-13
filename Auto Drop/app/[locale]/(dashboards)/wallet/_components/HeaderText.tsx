import React from "react";

export default function HeaderText({
  isAr,
  title,
}: {
  isAr: boolean;
  title: string;
}) {
  return (
    <div>
      <div
        className={`text-2xl text-[#253439] mt-8 ${
          isAr ? `ml-3 tab:ml-3 tab:mr-3` : `mr-3 tab:mr-3 tab:ml-3`
        } dark:text-white `}
      >
        {title}
      </div>
    </div>
  );
}

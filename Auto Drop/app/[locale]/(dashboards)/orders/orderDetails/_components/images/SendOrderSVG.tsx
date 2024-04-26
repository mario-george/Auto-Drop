import React from "react";

function SendOrderSVG({isAr}:{ isAr:boolean} ) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="39"
      fill="none"
      viewBox="0 0 34 39"
      className={` ${!isAr && `transform rotate-180`   }`}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.903 8.605l-10.255 5.85c-4.602 2.626-4.549 7.02.1 9.783l10.377 6.134c6.977 4.129 9.786.865 6.232-7.24l-1.567-3.578 1.495-3.536c3.39-8.01.522-11.34-6.382-7.413z"
      className="dark:stroke-[#253439]"
      ></path>
      <path fill="#FDA754" d="M20.364 18.763l-6.745-.094 6.745.094z"></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20.364 18.763l-6.745-.094"
      className="dark:stroke-[#253439]"
      ></path>
    </svg>
  );
}

export default SendOrderSVG;

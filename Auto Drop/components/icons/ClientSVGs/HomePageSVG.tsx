import React from "react";
import "./strokeOpacityActive.css";
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className="group "
    >
      <path
        stroke="#253439"
        className="strokeDark icon-path icon-path-mid "
        strokeLinecap="round"
        strokeLinejoin="round"
        // strokeOpacity={"0.5"}
        strokeWidth="1.5"
        d="M10.07 2.82L3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01z"
      ></path>
      <path
        stroke="#253439"
        strokeLinecap="round"
        className="  strokeDark icon-path icon-path-mid "
        strokeLinejoin="round"
        // strokeOpacity={"0.5"}
        strokeWidth="1.5"
        d="M12 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      ></path>
    </svg>
  );
}

export default Icon;

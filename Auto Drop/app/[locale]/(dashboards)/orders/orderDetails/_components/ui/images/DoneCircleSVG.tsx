import React from "react";
function RightSign() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        stroke="#263238"
        strokeLinecap="round"
        d="M1 10l5 3.6M14 1L6 13.6"
      ></path>
    </svg>
  );
}

function DoneCircleSVG() {
  return (
    <>

    <div className="relative w-fit h-fit">


    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      fill="none"
      viewBox="0 0 38 38"
      >
      <circle
        cx="19"
        cy="19"
        r="18.25"
        stroke="#263238"
        strokeWidth="1.5"
      ></circle>
    </svg>
    <div className="absolute top-[35%] left-[30%] w-fit h-fit "> <RightSign/>
    </div>
     
    </div>
    </>
  );
}

export default DoneCircleSVG;




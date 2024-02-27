import React from "react";
import Image from "next/image";

export default function ProductImageRenderer({ product }: any) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex">
          <Image
            src={product?.images[0].original}
            alt="Product Image"
            width={518}
            height={691}
            className="rounded-md mx-auto"
          />{" "}
        </div>
        <div className="flex flex-wrap space-s-3 my-3">
          {product?.images.map((image: any, index: number) => {
            return (
              index > 0 && (
                
                <Image
                  src={image.original}
                  alt="Product Image"
                  width={900}
                  height={1200}
                  className="rounded-md w-[57px] h-[75px]"
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

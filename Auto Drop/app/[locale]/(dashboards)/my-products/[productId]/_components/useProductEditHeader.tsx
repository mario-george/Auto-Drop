"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";

export default function useProductEditHeader({
  uploadProduct,
  addToCart,
  addToCartHandler,
  uploadProductHandler,
}: any) {
  const [quantity, setQuantity] = useState(1);

  const toggleLang = (lang: string) => {};
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  let ProductHeaderComponent = (
    <>
      <div className="HeaderContainer ">
        <Button
          className="bg-[#40a58d] text-white"
          onClick={uploadProductHandler}
        >
          {uploadProduct}
        </Button>
        <Button
          className="bg-white text-black shadow-md dark:text-black"
          onClick={addToCartHandler}
        >
          {addToCart}
        </Button>
        <div className="flex justify-center bg-white text-black rounded-xl shadow-md items-center ">
          <Button
            className="bg-white text-black hover:bg-white/80 dark:text-black"
            onClick={decreaseQuantity}
          >
            -
          </Button>
          <Label>{quantity}</Label>
          <Button
            className="bg-white text-black hover:bg-white/80 dark:text-black"
            onClick={increaseQuantity}
          >
            +
          </Button>
        </div>
        <Button
          className="bg-[#253439] text-white hover:bg-[#253439]"
          onClick={() => {
            toggleLang("ar");
          }}
        >
          AR
        </Button>
        <Button
          className="text-[#959595] bg-[#d1d1d1]"
          onClick={() => {
            toggleLang("en");
          }}
        >
          EN
        </Button>
      </div>
    </>
  );
  return { ProductHeaderComponent, choosenCartQuantity: quantity, setQuantity };
}

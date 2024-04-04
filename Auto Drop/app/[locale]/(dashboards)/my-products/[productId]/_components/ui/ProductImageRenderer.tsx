import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Radio, RadioGroup } from "@chakra-ui/react";

interface ProductImage {
  alt: string;
  default: boolean;
  original: string;
  thumbnail: string;
}

export default function ProductImageRenderer({
  setProductImages,
  productImages,
}: any) {
  // const [value,setValue]=useState(product?.images[0].original)
const [initialImages,setInitialImages]=useState(productImages||[])
useEffect(()=>{
  if(productImages.length!==initialImages.length){
  setInitialImages(productImages)
  }
},[productImages])
let defaultImageIndex = 0;
/*   if (productImages && productImages?.length > 0) {
    defaultImageIndex = productImages.findIndex((image: ProductImage) => {
      return image.default;
    });
  }
 */
  if (initialImages && initialImages?.length > 0) {
    defaultImageIndex = initialImages.findIndex((image: ProductImage) => {
      return image.default;
    });
  }
  console.log("productImages", productImages);
  const handleImageDefaultChange : (val:string)=>void = (newIndexString: string) => {
    let newIndex = Number(newIndexString);

    let firstImageInitial = initialImages[newIndex];
    setProductImages((prevImages: ProductImage[]) => {
      let tempImages = [...prevImages];
      // let firstImage = tempImages[newIndex];
      tempImages = tempImages
        .map((image: ProductImage) => {
          return { ...image, default: false };
        })
        .filter((image: ProductImage, index: number) => {
          return image.original !== firstImageInitial.original ;
        });

        firstImageInitial.default = true;
      return [firstImageInitial, ...tempImages];
    });

    setInitialImages((prevImages: ProductImage[]) => {

      let tempImages = [...prevImages ]
      tempImages = tempImages.map((image: ProductImage) => {
        return { ...image, default: false };
      })

      tempImages[+newIndexString].default = true  
return tempImages
    })
    return
  };

  // console.log("product.images", product.images);
  console.log("productImages", productImages);
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex">
          <Image
            src={initialImages[defaultImageIndex]?.original}
            alt="Product Image"
            width={518}
            height={691}
            className="rounded-md mx-auto"
          />{" "}
        </div>
        <RadioGroup
          value={defaultImageIndex.toString()}
          onChange={handleImageDefaultChange}
        >
          <div className="grid grid-cols-3 tab:grid-cols-5 justify-center gap-3 my-3">
            {initialImages.map((image: any, index: number) => {
              return (
                <Radio value={index.toString()} key={index.toString()}>
                  <Image
                    src={image.original}
                    alt="Product Image"
                    width={900}
                    height={1200}
                    className="rounded-md w-[57px] h-[75px]"
                  />
                </Radio>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

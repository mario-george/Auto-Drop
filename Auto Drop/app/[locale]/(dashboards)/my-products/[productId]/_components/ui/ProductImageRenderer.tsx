import React from 'react'
import Image from 'next/image';

export default function ProductImageRenderer({product}:any) {
  return (
    <div>
       <div>
          <Image
            src={product?.images[0].original}
            alt="Product Image"
            width={518}
            height={691}
            className="rounded-md mx-auto"
          />{" "}
        </div>
    </div>
  )
}

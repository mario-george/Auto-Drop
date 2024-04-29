"use client"

import { useSelector } from "react-redux";
import ProductsRenderer from "./ProductsRenderer";
import { RootState } from "@/store";

export default function ProductsProtector(props:any){
  const aliExpressToken = useSelector((state: RootState) => state.user.aliExpressToken);
  if(!aliExpressToken){
    return <>Please Link your account with aliexpress and try again</>
  }else{
return <ProductsRenderer    {...props} />
  }
}
"use client"

import { useToast } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function useCheckMerchant(){
let params = useSearchParams()
let merchantAlreadyConnected=params.get("merchantAlreadyConnected")
let error = false
console.log(merchantAlreadyConnected)
if( merchantAlreadyConnected=='true'){
    error = true
}
const toast = useToast()
let title="Error"
let description="Merchant already connected"
useEffect(()=>{
    if(error){
        toast({
            title,
            description,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
    }
},[error])

return {error}

}
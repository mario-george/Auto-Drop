"use client"

import { useToast } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"

export default function useCheckMerchant(){
let params = useSearchParams()
let merchantAlreadyConnected=params.get("?merchantAlreadyConnected=true")
let error = false
if( merchantAlreadyConnected=='true'){
    error = true
}
const toast = useToast()
let title="Error"
let description="Merchant already connected"

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
return {error}

}
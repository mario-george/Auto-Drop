"use client"

import { useToast } from "@chakra-ui/react"
import { useRouter, useSearchParams ,usePathname} from "next/navigation"
import { useEffect } from "react"
export default function useCheckMerchant(){
let params = useSearchParams()
let merchantAlreadyConnected=params.get("merchantAlreadyConnected")
const pathName= usePathname()
let error = false
console.log(merchantAlreadyConnected)
if( merchantAlreadyConnected=='true'){
    error = true
}
const toast = useToast()
let title="Error"
let description="Merchant already connected"
const router = useRouter();
useEffect(() => {
    if (error) {
        toast({
            title,
            description,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
        });
        router.replace(pathName);

        // Clear the search parameters
        /* router.replace({
            pathname: pathName,
            query: {},
        }, undefined, 
        // { scroll: false }
    ); */
    }
}, [error, router, toast]);

return {error}

}
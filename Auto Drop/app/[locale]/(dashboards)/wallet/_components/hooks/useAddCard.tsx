import {useState } from 'react'
import {Radio,RadioGroup } from '@chakra-ui/react'
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Card {
link:string
value:string
radio:string

}
export default function useAddCard({chargeWallet}:{chargeWallet:string}){
    const [value,setValue]=useState('0')
    const cards = [{value:"XXXXXXXXX2154",link:"/client/wallet/visa.svg",radio:"0"},{value:"XXXXXXXXX2154",link:"/client/wallet/mastercard.svg",radio:"1"},{value:"XXXXXXXXX2154",link:"/client/wallet/apple-pay.svg",radio:"2"},{value:"XXXXXXXXX2154",link:"/client/wallet/stc-pay.svg",radio:"3"}]
    let AddCardComponent = (<>

    <div className="bg-white dark:bg-[#2e464f] ">


    <RadioGroup value={value} onChange={setValue}>

{cards.map((card:Card)=>{
let {link,value:val,radio}=card
return <>
<div  className="flex  space-s-3 my-3">


<Radio value={radio}>
<div className="bg-[#f0f3f4] rounded-xl p-3">
    <Image src={link} width={24} height={24} alt={"png"}/>
</div>

</Radio>
<Input className="max-w-[30%]" value={val} />
</div>


</>
})}

        </RadioGroup>
        
    <div className="w-[80%] flex justify-center my-2">
        <Button className="bg-[#B29E84] hover:bg-[#B29E84]/90 ">
          {" "}
          {chargeWallet}
        </Button>
    </div>
    </div>
    </>)
    return {value,AddCardComponent}
}
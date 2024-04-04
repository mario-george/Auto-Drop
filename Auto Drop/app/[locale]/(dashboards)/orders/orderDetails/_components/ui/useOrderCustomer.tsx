import { Textarea } from '@/components/ui/textarea';
import HeaderText from '../../../../wallet/_components/HeaderText';
import { useRef } from 'react';
import HeaderOnePartSection from '../../../../_components/shared/ui/HeaderOnePartSection';
import HeaderTwoPartSection from '@/app/[locale]/(dashboards)/_components/shared/ui/HeaderTwoPartsSection';
import { Button } from '@chakra-ui/react';
import EditSVG from '../images/EditSVG';
import RoundedCardWrapper from '@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper';
interface OrderCustomerProps{
firstNameText:string;
lastNameText:string;
firstName:string;
lastName:string;
emailText:string;
email:string;
locale:string
phoneText:string;
phone:string;
countryText:string;
country:string;
cityText:string;
city:string;
districtText:string;
district:string;
address:string;
addressText:string;
postalCode:string;
postalCodeText:string;
region:string
regionText:string
editCustomerHandler:()=>void
editText:string
deliveryDetails:string
}

interface GridItem{
    title:string|undefined
    value:string|undefined
}
export default function useOrderCustomer(props:Partial<OrderCustomerProps>){

let {firstNameText,
    lastNameText,
    firstName,
    lastName,
    emailText,
    email,
    locale,    phoneText,
    phone,
    countryText,
    country,
    cityText,
    city,
    districtText,
    district,
    address,
    addressText,
    postalCode,
    postalCodeText,
    editCustomerHandler,
    editText,deliveryDetails,region,regionText

}=props
let gridItems= [{title:firstNameText,value:firstName},
    {title:lastNameText,value:lastName},
    {title:emailText,value:email},
    {title:phoneText,value:phone},
    {title:countryText,value:country},
    {title:regionText,value:region},
    {title:cityText,value:city},
    {title:postalCodeText,value:postalCode},
    {title:districtText,value:district},
    {title:addressText,value:address},

]
let EditButton = <>
<Button onClick={editCustomerHandler} className="flex space-s-3 !bg-[#B29E84] !text-white">
    <p>
    {editText}

    </p>
    <p>
<EditSVG/>
    </p>
    </Button>
</>

let skyIndex = [2,3,6,7]
let OrderCustomer= <>
<HeaderTwoPartSection isAr={locale=="ar"} title={deliveryDetails as string} secondElement={EditButton}/>
<RoundedCardWrapper>
    <div className="grid grid-cols-1 tab:grid-cols-2 gap-1 tab:gap-3 py-3">
    {gridItems.map((gridEl:GridItem,index:number)=>{
        let {title,value} = gridEl
        if(!title) title=''
        if(!value) value=''

console.log(skyIndex.includes(2))
return <>
<div className={`flex space-s-3 px-3 ${skyIndex.includes(index) && `  bg-[#F4F6F7]`}`}>
    <p className="font-bold text-xs tab:text-sm">
{title}
    </p>
    <p className="text-xs tab:text-sm">
{value}
    </p>
    </div> 

</>
})}
    </div>
</RoundedCardWrapper>
</>
return {OrderCustomer}
    
}
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
secondNameText:string;
firstName:string;
secondName:string;
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
editCustomerHandler:()=>void
editText:string
deliveryDetails:string
}


export default function useOrderCustomer(props:OrderCustomerProps){

let {firstNameText,
    secondNameText,
    firstName,
    secondName,
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
    editText,deliveryDetails}=props

let EditButton = <>
<Button onClick={editCustomerHandler} className="flex space-s-3 !bg-[#B29E84] text-white">
    <p>
    {editText}

    </p>
    <p>
<EditSVG/>
    </p>
    </Button>
</>
let OrderCustomer= <>
<HeaderTwoPartSection isAr={locale=="ar"} title={deliveryDetails} secondElement={EditButton}/>
<RoundedCardWrapper>
    <div className="grid grid-cols-1 tab:grid-cols-2 gap-1 tab:gap-3">

    </div>
</RoundedCardWrapper>
</>
return {OrderCustomer}
    
}
import { Textarea } from "@/components/ui/textarea";
import HeaderText from "../../../../wallet/_components/HeaderText";
import { useRef } from "react";
import HeaderOnePartSection from "../../../../_components/shared/ui/HeaderOnePartSection";
import HeaderTwoPartSection from "@/app/[locale]/(dashboards)/_components/shared/ui/HeaderTwoPartsSection";
import { Button } from "@chakra-ui/react";
import EditSVG from "../images/EditSVG";
import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import { Input } from '@/components/ui/input';
interface OrderCustomerProps {
  firstNameText: string;
  lastNameText: string;
  firstName: string;
  lastName: string;
  emailText: string;
  email: string;
  locale: string;
  phoneText: string;
  phone: string;
  countryText: string;
  country: string;
  cityText: string;
  city: string;
  districtText: string;
  district: string;
  address: string;
  addressText: string;
  postalCode: string;
  postalCodeText: string;
  region: string;
  regionText: string;
  editCustomerHandler: () => void;
  editText: string;
  deliveryDetails: string;
}

interface GridItem {
  title: string | undefined;
  value: string | undefined;
  ref :  React.RefObject<HTMLInputElement>|undefined
}
export default function useOrderCustomer(props: Partial<OrderCustomerProps>) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const mobileNumberCodeRef = useRef<HTMLInputElement>(null);
  let {
    firstNameText,
    lastNameText,
    firstName,
    lastName,
    emailText,
    email,
    locale,
    phoneText,
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
    editText,
    deliveryDetails,
    region,
    regionText,
  } = props;
  let gridItems = [
    { title: firstNameText, value: firstName,ref:firstNameRef },
    { title: lastNameText, value: lastName ,ref:lastNameRef},
    { title: emailText, value: email  
    , ref:emailRef
    },
    { title: phoneText, value: phone,ref:mobileNumberRef  },
    { title: countryText, value: country ,ref:countryRef},
    { title: regionText, value: region ,ref:regionRef},
    { title: cityText, value: city ,ref:cityRef},
    { title: postalCodeText, value: postalCode ,ref:postalCodeRef},
    { title: districtText, value: district ,ref:districtRef},
    { title: addressText, value: address ,ref:streetRef},
  ];
  let EditButton = (
    <>
      <Button
        onClick={editCustomerHandler}
        className="flex space-s-3 !bg-[#B29E84] !text-white"
      >
        <p>{editText}</p>
        <p>
          <EditSVG />
        </p>
      </Button>
    </>
  );
console.log("firstNameRef.current.value",firstNameRef?.current?.value)
console.log("lastNameRef.current.value",lastNameRef?.current?.value)
  let skyIndex = [2, 3, 6, 7];
  let OrderCustomer = (
    <>
      <HeaderTwoPartSection
        isAr={locale == "ar"}
        title={deliveryDetails as string}
        secondElement={EditButton}
      />
      <RoundedCardWrapper>
        <div className="grid grid-cols-1 tab:grid-cols-2 gap-1 tab:gap-3 py-3">
          {gridItems.map((gridEl: GridItem, index: number) => {
            let { title, value,ref } = gridEl;
            if (!title) title = "";
            if (!value) value = "";
            interface InputElementPropsInterface{
              defaultValue:string|undefined,
              ref:React.RefObject<HTMLInputElement>|undefined
            }
   let InputElementProps:Partial<InputElementPropsInterface>={
    defaultValue:value,

   }
  if(ref){
    InputElementProps.ref= ref
  }
            console.log(skyIndex.includes(2));
            return (
              <>
                <div
                  className={`flex space-s-3 justify-center px-3 ${
                    skyIndex.includes(index) && `  bg-[#F4F6F7]`
                  }`}
                >
                  <p className="font-bold text-xs tab:text-sm">{title}</p>
                  {/* <p className="text-xs tab:text-sm">{value}</p> */}
                  <Input {...InputElementProps} className="text-xs tab:text-sm"/>
                </div>
              </>
            );
          })}
        </div>
      </RoundedCardWrapper>
    </>
  );
  let CustomerData ={
    firstName : firstNameRef?.current?.value,
      lastName : lastNameRef?.current?.value,
      email : emailRef?.current?.value,
      phone : mobileNumberRef?.current?.value,
      country : countryRef?.current?.value,
      region : regionRef?.current?.value,
      city : cityRef?.current?.value,
      postalCode : postalCodeRef?.current?.value,
      district : districtRef?.current?.value,
      address : streetRef?.current?.value,


    
  }
  return { OrderCustomer ,CustomerData};
}

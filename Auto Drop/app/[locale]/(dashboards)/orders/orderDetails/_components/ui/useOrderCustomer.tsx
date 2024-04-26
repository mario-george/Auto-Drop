import { Textarea } from "@/components/ui/textarea";
import HeaderText from "../../../../wallet/_components/HeaderText";
import HeaderOnePartSection from "../../../../_components/shared/ui/HeaderOnePartSection";
import HeaderTwoPartSection from "@/app/[locale]/(dashboards)/_components/shared/ui/HeaderTwoPartsSection";
import { Button } from "@chakra-ui/react";
import EditSVG from "../images/EditSVG";
import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import CountryFlag  from 'react-phone-number-input'
import { Select } from "@chakra-ui/react";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getCountryCallingCode } from "react-phone-number-input";
export type CountryCode = 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';
export interface CustomerDataType {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  mobile: string | undefined;
  mobile_code: string | undefined;
  country: string | undefined;
  region: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  district: string | undefined;
  address: string | undefined;
}
interface OrderCustomerProps {
  firstNameText: string;
  lastNameText: string;
  firstName: string;
  lastName: string;
  emailText: string;
  email: string;
  locale: string;
  phoneText: string;
  mobile:string
  mobile_code:string
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
  editCustomerHandler: (data: CustomerDataType) => void;
  editText: string;
  deliveryDetails: string;
}

interface GridItem {
  title: string | undefined;
  value: string | undefined;
  ref: React.RefObject<HTMLInputElement> | undefined;
  secondRef?: React.RefObject<HTMLInputElement> | undefined;
  secondValue?: string | undefined;
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
    mobile,
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
    mobile_code,
  } = props;
  let gridItems = [
    { title: firstNameText, value: firstName, ref: firstNameRef },
    { title: lastNameText, value: lastName, ref: lastNameRef },
    { title: emailText, value: email, ref: emailRef },
    {
      title: phoneText,
      value:mobile,
      secondValue: mobile_code,
      ref:mobileNumberRef ,
      secondRef:  mobileNumberCodeRef,
    },
    { title: countryText, value: country, ref: countryRef },
    { title: regionText, value: region, ref: regionRef },
    { title: cityText, value: city, ref: cityRef },
    { title: postalCodeText, value: postalCode, ref: postalCodeRef },
    { title: districtText, value: district, ref: districtRef },
    { title: addressText, value: address, ref: streetRef },
  ];
 
  let EditButton = (
    <>
      <Button
        onClick={() => {
          if (editCustomerHandler) {
 if(countryCodeNumber == null){
  return
 }

            let CustomerData = {
              firstName: firstNameRef?.current?.value,
              lastName: lastNameRef?.current?.value,
              email: emailRef?.current?.value,
              mobile: mobileNumberRef?.current?.value,
              // mobile_code: mobileNumberCodeRef?.current?.value,
              mobile_code: countryCodeNumber,
              
              // country: countryRef?.current?.value,
              country:countryCode,
              region: regionRef?.current?.value,
              city: cityRef?.current?.value,
              postalCode: postalCodeRef?.current?.value,
              district: districtRef?.current?.value,
              address: streetRef?.current?.value, 
            };
            editCustomerHandler(CustomerData);
          }
        }}
        className="flex space-s-3 !bg-[#B29E84] !text-white"
      >
        <p>{editText}</p>
        <p>
          <EditSVG />
        </p>
      </Button>
    </>
  );
  console.log("firstNameRef.current.value", firstNameRef?.current?.value);
  console.log("lastNameRef.current.value", lastNameRef?.current?.value);
  const SmallFlag = ({ country, ...rest }:any) => {return <>
    <img src={rest.flagUrl} className="w-[10px] h-[10px]" width="10px" height="10px"/>
   
  </>}
  const [countryCode, setCountryCode] = useState('');
  const [countryCodeNumber, setCountryCodeNumber] = useState<null | string>(null);
  useEffect(() => {
    if(country && countryCode == ""){

      console.log("country",country)
      setCountryCode(country as string)
      const callingCode = '+' + getCountryCallingCode(country as CountryCode);

      setCountryCodeNumber(callingCode); // using setCountryCodeNumber here
    }
  } ,[country])
const DummyInputComponent = forwardRef((props:any, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current && inputRef.current.focus();
    }
  }));
/*   console.log(props.value)
  console.log("props",props)
  if (props.value) {
    const matches = props.value.match(/^(\+\d+)/);
    if (matches) {
      setCountryCode(matches[0]);
    }
  } */
  return   <div className="hidden">
  <input value={countryCode} readOnly className="country-code" />
  <input ref={inputRef} value={props.value.replace(new RegExp(`^${countryCode}`), '')} onChange={props.onChange} className="phone-number" />
</div>;
});
console.log("countryCodeNumber",countryCodeNumber)
const CountrySelect = ({ name, value, onChange, options }:any) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value);
    onChange(event.target.value);
    const callingCode = '+' + getCountryCallingCode(event.target.value as CountryCode);

    setCountryCodeNumber(callingCode); // using setCountryCodeNumber here

  };

  return (
    <Select name={name} value={value} onChange={handleChange} className="!bg-[#EDF5F9]">
      {options.map(({ value, label }:any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};
  let skyIndex = [2, 3, 6, 7];
  let OrderCustomer = (
    <>
      <HeaderTwoPartSection
        isAr={locale == "ar"}
        title={deliveryDetails as string}
        secondElement={EditButton}
      />
      <RoundedCardWrapper>
        <div className="grid grid-cols-1 tab:grid-cols-2 items-center gap-1 tab:gap-3 py-3">
          {gridItems.map((gridEl: GridItem, index: number) => {
            let { title, value, ref } = gridEl;
            if (!title) title = "";
            if (!value) value = "";


            if(countryText==title){
              return  <div            className={`flex space-s-3 items-center px-3 ${
                skyIndex.includes(index) && `dark:bg-black  bg-[#F4F6F7]`
              }`}>
                    <p className="font-bold text-xs tab:text-sm">{title}</p>

<PhoneInput
  international={false}
  flagComponent={SmallFlag}
  // countryCallingCodeEditable={false}
  countrySelectComponent={CountrySelect}
  inputComponent={DummyInputComponent}
  //@ts-ignore
  defaultCountry={countryCode}
  // placeholder={""}
  id="phone"
  className=" md:text-base flex rounded-md border border-input px-3 py-2"
  onChange={(value) => {
    console.log("value", value);
  }}
/>
              </div>
            }
            interface InputElementPropsInterface {
              defaultValue: string | undefined;
              ref: React.RefObject<HTMLInputElement> | undefined;
            }
            let InputElementProps: Partial<InputElementPropsInterface> = {
              defaultValue: value,
            };
            if (ref) {
              InputElementProps.ref = ref;
            }
            if (gridEl?.secondRef && title == phoneText) {
              let InputElement2Props = {
                value: countryCodeNumber??'',
                // ref: gridEl.secondRef,
              };
              return (
                <>
                  <div
                    className={`flex space-s-3 items-center px-3 ${
                      skyIndex.includes(index) && `dark:bg-black  bg-[#F4F6F7]`
                    }`}
                  >
                    <p className="font-bold text-xs tab:text-sm">{title}</p>
                  
              <Input
                      {...InputElement2Props}
                      className="text-xs tab:text-sm !flex-2 !max-w-[25%] tab:!max-w-[10%] "
                    /> 
                    <Input
                      {...InputElementProps}
                      className="text-xs tab:text-sm !flex-6"
                      type="number"
                    />
                  </div>
                </>
              );
            }
            return (
              <>
                <div
                  className={`flex space-s-3 items-center px-3 ${
                    skyIndex.includes(index) && `dark:bg-black  bg-[#F4F6F7]`
                  }`}
                >
                  <p className="font-bold text-xs tab:text-sm">{title}</p>
                  <Input
                    {...InputElementProps}
                    className="text-xs tab:text-sm"
                  />
                </div>
              </>
            );
          })}
        </div>
      </RoundedCardWrapper>
    </>
  );
const getCustomerData = () => { 
return {
  firstName: firstNameRef?.current?.value,
  lastName: lastNameRef?.current?.value,
  email: emailRef?.current?.value,
  mobile: mobileNumberRef?.current?.value,
  // mobile_code: mobileNumberCodeRef?.current?.value,
  mobile_code: countryCodeNumber,
  
  // country: countryRef?.current?.value,
  country:countryCode,
  region: regionRef?.current?.value,
  city: cityRef?.current?.value,
  postalCode: postalCodeRef?.current?.value,
  district: districtRef?.current?.value,
  address: streetRef?.current?.value, 
};
}
  return { OrderCustomer ,getCustomerData};
}

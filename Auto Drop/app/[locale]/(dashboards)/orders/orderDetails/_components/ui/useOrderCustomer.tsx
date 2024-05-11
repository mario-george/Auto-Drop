import { Textarea } from "@/components/ui/textarea";
import HeaderText from "../../../../wallet/_components/HeaderText";
import HeaderOnePartSection from "../../../../_components/shared/ui/HeaderOnePartSection";
import HeaderTwoPartSection from "@/app/[locale]/(dashboards)/_components/shared/ui/HeaderTwoPartsSection";
import { Button } from "@chakra-ui/react";
import EditSVG from "../images/EditSVG";
import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import CountryFlag from "react-phone-number-input";
import { Select } from "@chakra-ui/react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getCountryCallingCode } from "react-phone-number-input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { CountryCode } from "./const/types/Country";
import {
  OrderCustomerProps,
  GridItem,
  CustomerDataType,
} from "./const/types/CustomerProps";
import { cities, getProvince } from "./const/City";

interface CitySelectorProps {
  locale: string;
  defaultCity: string;
  // cityRef: React.RefObject<HTMLInputElement>;
  // regionRef: React.RefObject<HTMLInputElement>;
  setCityValue:(val:string|null)=>void;
  setRegionValue:(val:string|null)=>void;
  cityValue?:string |null
  regionValue?:string|null
}
function CitySelector(props: CitySelectorProps) {
  let { locale, defaultCity ,setCityValue,setRegionValue,cityValue,regionValue} = props;
  let citiesObj = cities as { [key: string]: string };

  let citiesEntries = Object.entries(citiesObj).map(
    ([key, value]: [string, string], index: number) => {
      let currCity = value;
      if (locale == "ar") {
        currCity = key;
      }

      return {
        label: currCity,
        value:index,
        valueEN: value,
        valueAR: key,
      };
    }
  );
let choosenCity = citiesEntries.find((city:{
  valueAR:string,
  valueEN:string

}) => (city.valueAR== defaultCity || city.valueEN== defaultCity ));
 console.log("choosenCity",choosenCity)
if(!choosenCity){
  choosenCity = citiesEntries[0];
}
let choosenCityKey = choosenCity.value;
if(cityValue == null || regionValue == null){

  setCityValue(choosenCity.valueEN)
  setRegionValue(getProvince(choosenCity.valueEN))
}
  return (
    <Autocomplete
      isRequired
      // label="City"
      defaultItems={citiesEntries}
      placeholder="Search a city"
      defaultSelectedKey={choosenCityKey.toString()}
      // className="max-w-xs"
      // className="!text-black"
      variant={"bordered"}

      color = "primary"
      onSelectionChange={(key: any) => {
        console.log("key", key);
let cityName = citiesEntries?.[key as number]?.valueEN
        console.log("cityName",cityName)
        console.log("getProvince(cityName)",getProvince(cityName))
setCityValue(cityName)
setRegionValue(getProvince(cityName))


      }}
    >
      {(item: any) => (
        <AutocompleteItem
        key={item.value}
        className="text-black">{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
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
const [regionValue,setRegionValue] = useState<string | null>(null)
const [cityValue, setCityValue] = useState<string | null>(null);
console.log("regionValue",regionValue)
console.log("cityValue",cityValue)
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
      value: mobile,
      secondValue: mobile_code,
      ref: mobileNumberRef,
      secondRef: mobileNumberCodeRef,
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
            if (countryCodeNumber == null) {
              return;
            }

            let CustomerData = {
              firstName: firstNameRef?.current?.value,
              lastName: lastNameRef?.current?.value,
              email: emailRef?.current?.value,
              mobile: mobileNumberRef?.current?.value,
              // mobile_code: mobileNumberCodeRef?.current?.value,
              mobile_code: countryCodeNumber,

              // country: countryRef?.current?.value,
              country: countryCode,
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
  console.log("cityRef.current.value",regionRef?.current?.value)

  const SmallFlag = ({ country, ...rest }: any) => {
    return (
      <>
        <img
          src={rest.flagUrl}
          className="w-[10px] h-[10px]"
          width="10px"
          height="10px"
        />
      </>
    );
  };
  const [countryCode, setCountryCode] = useState("");
  const [countryCodeNumber, setCountryCodeNumber] = useState<null | string>(
    null
  );
  useEffect(() => {
    if (country && countryCode == "") {
      console.log("country", country);
      setCountryCode(country as string);
      const callingCode = "+" + getCountryCallingCode(country as CountryCode);

      setCountryCodeNumber(callingCode); // using setCountryCodeNumber here
    }
  }, [country]);
  const DummyInputComponent = forwardRef((props: any, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current && inputRef.current.focus();
      },
    }));
    /*   console.log(props.value)
  console.log("props",props)
  if (props.value) {
    const matches = props.value.match(/^(\+\d+)/);
    if (matches) {
      setCountryCode(matches[0]);
    }
  } */
    return (
      <div className="hidden">
        <input value={countryCode} readOnly className="country-code" />
        <input
          ref={inputRef}
          value={props.value.replace(new RegExp(`^${countryCode}`), "")}
          onChange={props.onChange}
          className="phone-number"
        />
      </div>
    );
  });
  console.log("countryCodeNumber", countryCodeNumber);
  const CountrySelect = ({ name, value, onChange, options }: any) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCountryCode(event.target.value);
      onChange(event.target.value);
      const callingCode =
        "+" + getCountryCallingCode(event.target.value as CountryCode);

      setCountryCodeNumber(callingCode); // using setCountryCodeNumber here
    };

    return (
      <Select
        name={name}
        value={value}
        onChange={handleChange}
        className="!bg-[#EDF5F9] dark:!text-[#253439]"
      >
        {options.map(({ value, label }: any) => (
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
        <div className="grid grid-cols-1 tab:grid-cols-2 items-center gap-2 tab:gap-3 py-3">
          {gridItems.map((gridEl: GridItem, index: number) => {
            let { title, value, ref } = gridEl;
            if (!title) title = "";
            if (!value) value = "";
            if(cityText == title){
  console.log(locale,"locale")
  console.log(value,"value")
  let CitySelectorProps = {
    cityValue,regionValue,setCityValue,defaultCity:value,setRegionValue,locale:locale as string
  }
  return<>
    <div
                  className={`flex space-s-3 items-center px-3 ${
                    skyIndex.includes(index) &&
                    `dark:bg-[#2E464F]  bg-[#F4F6F7]`
                  }`}
                  key={index}
                >
                  <p className="orderFieldTitleComponent">{title}</p>

                  <CitySelector {...CitySelectorProps} />
                </div>
  </>
}
if(regionText==title){
      return (
              <>
                <div
                  className={`flex space-s-3 items-center px-3 ${
                    skyIndex.includes(index) &&
                    `dark:bg-[#2E464F]  bg-[#F4F6F7]`
                  }`}
                  key={index}
                >
                  <p className="orderFieldTitleComponent">{title}</p>
                  <Input
                    className="text-xs tab:text-sm"
                    value = {regionValue ??"Riyadh"}
                  />
                </div>
              </>
            );
}
            if (countryText == title) {
              return (
                <div
                  className={`flex space-s-3 items-center px-3 ${
                    skyIndex.includes(index) &&
                    `dark:bg-[#2E464F]  bg-[#F4F6F7]`
                  }`}
                  key={index}
                >
                  <p className="orderFieldTitleComponent">{title}</p>

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
                    className=" md:text-base flex rounded-md px-3 !w-full "
                    onChange={(value) => {
                      console.log("value", value);
                    }}
                  />
                </div>
              );
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
                value: countryCodeNumber ?? "",
                // ref: gridEl.secondRef,
              };
              return (
                <>
                  <div
                    className={`flex space-s-7 items-center px-3 ${
                      skyIndex.includes(index) &&
                      `dark:bg-[#2E464F]  bg-[#F4F6F7]`
                    }`}
                    key={index}
                  >
                    <p className="orderFieldTitleComponent">{title}</p>
{/* <div className="flex space-s-3 items-center justify-between"> */}

                    <Input
                      {...InputElement2Props}
                      className="text-xs tab:text-sm !flex-2 !max-w-[25%] tab:!max-w-[10%] "
                    />
                    <Input
                      {...InputElementProps}
                      className="text-xs tab:text-sm !flex-6"
                      type="number"
                    />
{/* </div> */}
                  </div>
                </>
              );
            }
            return (
              <>
                <div
                  className={`flex space-s-3 items-center px-3 ${
                    skyIndex.includes(index) &&
                    `dark:bg-[#2E464F]  bg-[#F4F6F7]`
                  }`}
                  key={index}
                >
                  <p className="orderFieldTitleComponent">{title}</p>
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
      mobile_code: countryCodeNumber,

      country: countryCode,
      region: regionValue,
      city: cityValue,
      postalCode: postalCodeRef?.current?.value,
      district: districtRef?.current?.value,
      address: streetRef?.current?.value,
    };
  };
  return { OrderCustomer, getCustomerData };
}

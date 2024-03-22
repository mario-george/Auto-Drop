import Image from "next/image";
import { useSelector } from "react-redux";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import "./settings.css";
import { Switch } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

interface GeneralSettingsProps {
/*   settings: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  saveChanges: string;
  changePassword: string;
  changeAccountDetails: string;
  merchantID: string;
  name: string;
  marketName: string;
  marketLink: string;
  email: string;
  phone: string;
  country: string;*/
  locale?: string; 
  translation: { [key: string]: string };
}

export default function GeneralSettings(props: GeneralSettingsProps) {
  const user = useSelector((state: RootState) => state.user);
 
  const {
    locale,

    translation ,
  } = props;


  let { generalSettings,
    productSettings,
    syncProductPrices,
    syncProductQuantities,
    productPricingSettings,
    consolidatePricing,
    viewOriginal,
    withoutShipping,
    includedShipping,
    shippingSettings,
    shippingType,
    shippedW,
    pricesVAT,
    autoPay,
    delAndPack,
    paiementWhenRecieving,
    save,
    orderSettings,} =translation
  return (
    <>
      <MotionWrapper locale={locale}>
        <div className="ms:text-sm flex flex-col space-y-3 tab:space-y-6 mt-3">
          <div className="flex justify-center tab:justify-end  max-w-[90%] tab:max-w-[60%] "></div>
          <div>{productSettings}</div>

          <div className="formFieldWrapper   ">
            <Switch />
            <div>{syncProductPrices}</div>
          </div>
          <div className="formFieldWrapper   ">
            <Switch />
            <div>{syncProductQuantities}</div>
          </div>
          <div>{productPricingSettings}</div>
          <div className="formFieldWrapper   ">
            <Switch />
            <div>{consolidatePricing}</div>
          </div>
          <div className="formFieldWrapper   ">
            <div>{viewOriginal}</div>
            <RadioGroup
                    // defaultValue="shippingIncluded"
                    className="grid grid-cols-1 ml:grid-cols-2 gap-2 tab:my-0 my-2 ml:my-3 w-full"
                    /*               onValueChange={(value: string) => {
                      setShippingWithoutOrInclude(value);
                    }} */
                   /*  onChange={(value: string) => {
                      setShippingWithoutOrInclude(value);
                    }} */
                    // value={shippingWithoutOrInclude}
                  >
                    <div className="flex items-center space-x-2  bg-[#edf5f9] p-2 rounded-md">
                      <Radio value="withoutShipping">
                        <div
                          className=" text-xs dark:text-black whitespace-nowrap"
                          // htmlFor="r11"
                        >
                          {withoutShipping}
                        </div>
                      </Radio>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
                      <Radio value="shippingIncluded">
                        <div
                          className="text-xs  dark:text-black whitespace-nowrap"
                          // htmlFor="r22"
                        >
                          {includedShipping}
                        </div>
                      </Radio>
                    </div>
                  </RadioGroup>
          </div>
          
          <div>{shippingSettings}</div>

          <div>{orderSettings}</div>
          <div className="formFieldWrapper   ">
            <Switch className="" colorScheme=""/>
            <div>{autoPay}</div>
          </div>

         {/*  <div className="formFieldWrapper   ">
            <div>{merchantID}</div>
            <Input
              className="inputFieldDisabled"
              defaultValue={userId}
              disabled
            />
          </div>
          <div className="formFieldWrapper  ">
            <div>{name}</div>
            <Input className="inputField" value={userName} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{marketName}</div>
            <Input className="inputField" />
          </div>
          <div className="formFieldWrapper  ">
            <div>{marketLink}</div>
            <Input className="inputField" />
          </div>
          <div className="formFieldWrapper  ">
            <div>{email}</div>
            <Input className="inputField" value={userEmail} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{phone}</div>
            <Input className="inputField" value={userPhone} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{country}</div>
            <Input className="inputField" value={userCountry} />
          </div> */}
        </div>
      </MotionWrapper>
    </>
  );
}

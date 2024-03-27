import { useSelector } from "react-redux";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import { RootState } from "@/store";
import "./settings.css";
import { Switch } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState ,useEffect} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import axiosInstance from '@/app/[locale]/(dashboards)/_components/shared/AxiosInstance';
interface GeneralSettingsProps {
  locale?: string;
  translation: { [key: string]: string };
}
interface IUserSettings {
  highestPriceUnion:boolean
  syncProdPrices:boolean
  syncProdQuantities:boolean
  walletAutoPay:boolean
  shippingType:"withPackeging"
  originalPriceShipping:"withoutShipping"|"shippingIncluded"
}
export default function useGeneralSettings(props: GeneralSettingsProps) {
  const [settingsVals, setSettingsVals] = useState<IUserSettings>({
    syncProdPrices: false,
    syncProdQuantities: false,
    walletAutoPay: false,
    originalPriceShipping:"withoutShipping",
    shippingType:"withPackeging",
    highestPriceUnion:false
  });

  const toggleSwitch = (key:'syncProdPrices'|"syncProdQuantities"|"highestPriceUnion"|"walletAutoPay")=>{
/*     if(typeof settingsVals[key]!=="boolean"){
      return
    } */
    setSettingsVals((prevSettings)=>{
      return {...prevSettings,
      [key]:!settingsVals[key]
    }
    })
  }
  const saveSettingsHandler = async()=>{
    let res = await axiosInstance.patch("/settings",settingsVals)
    
    if(res.status<=200 && res.status<300){
      // toast success
      console.log("settings saved")
    }else{
      // toast save error
    }
    

  }
useEffect(()=>{
  try{
    const fetchSettings = async()=>{

      const res = await axiosInstance.get("/settings")
let userSettings = res.data.data
console.log("userSettings",userSettings)
      setSettingsVals((prevSettings)=>{
        return {
          ...prevSettings,userSettings
        }
      })
    }
    fetchSettings()
  }catch(err){
    console.error(err)
  }
},[])
  const {
    locale,

    translation,
  } = props;

  let {
    generalSettings,
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
    orderSettings,
    sa,
  } = translation;
let {  syncProdPrices ,  } = settingsVals
  let GeneralSettingsComponent =  <>
  <MotionWrapper locale={locale}>
    <div className="ms:text-sm flex flex-col space-y-3 tab:space-y-6 mt-3">
      <div className="flex justify-center tab:justify-end  max-w-[90%] tab:max-w-[60%] "></div>
      <div className="boldHeader"> {productSettings}</div>

      <div className="generalSettingsField   ">
        <Switch checked={true} onChange={()=>{toggleSwitch("syncProdPrices")}} />
        <div>{syncProductPrices}</div>
      </div>
      <div className="generalSettingsField   ">
        <Switch checked={true} onChange={()=>{toggleSwitch("syncProdQuantities")}}/>
        <div>{syncProductQuantities}</div>
      </div>
      <div className="boldHeader">{productPricingSettings}</div>
      <div className="generalSettingsField  ">
        <Switch checked={true} onChange={()=>{toggleSwitch("highestPriceUnion")}} />
        <div>{consolidatePricing}</div>
      </div>
      <div className="generalSettingsLargeField  lap:!space-s-16 tab:!max-w-[70%] lap:!max-w-[35%]  ">
        <div className="tab:whitespace-nowrap">{viewOriginal}</div>
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
          <div className="flex items-center space-s-2  bg-[#edf5f9] p-2 rounded-md">
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

      <div className="boldHeader">{shippingSettings}</div>

      <div className="flex flex-col space-y-3 tab:max-w-[30%]">
        <div>{shippingType}</div>
        <Select
          onValueChange={(value: any) => {
            // setProfitChoosenType(value);
          }}
          value={shippedW}
        >
          <SelectTrigger className="bg-[#edf5f9] dark:text-black">
            <SelectValue
              className=" dark:text-[#253439]"
              placeholder={shippedW}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={shippedW}>{shippedW}</SelectItem>
              {/* <SelectItem value="percentage">{'percentage'}</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator />
      <div className="flex flex-col space-y-2">
        <div className="">{shippedW}</div>
        <Separator />
        <div className="flex justify-between tab:max-w-[25%]">
          <div className="">{paiementWhenRecieving}</div>
          <div className="text-[#C1121F]">5{sa}</div>
        </div>

        <Separator />
        <div className="flex justify-between tab:max-w-[25%]">
          <div className="">{delAndPack}</div>

          <div className="text-[#C1121F]">10{" " + sa}</div>
        </div>
        <Separator />
      </div>

      <div className="text-[#C1121F]">{pricesVAT}</div>
      <div className="boldHeader">{orderSettings}</div>
      <div className="generalSettingsField   ">
        <Switch className="" checked={true} onChange={()=>{toggleSwitch("walletAutoPay")}} />
        <div>{autoPay}</div>
      </div>

      {/*  <div className="generalSettingsField   ">
        <div>{merchantID}</div>
        <Input
          className="inputFieldDisabled"
          defaultValue={userId}
          disabled
        />
      </div>
      <div className="generalSettingsField  ">
        <div>{name}</div>
        <Input className="inputField" value={userName} />
      </div>
      <div className="generalSettingsField  ">
        <div>{marketName}</div>
        <Input className="inputField" />
      </div>
      <div className="generalSettingsField  ">
        <div>{marketLink}</div>
        <Input className="inputField" />
      </div>
      <div className="generalSettingsField  ">
        <div>{email}</div>
        <Input className="inputField" value={userEmail} />
      </div>
      <div className="generalSettingsField  ">
        <div>{phone}</div>
        <Input className="inputField" value={userPhone} />
      </div>
      <div className="generalSettingsField  ">
        <div>{country}</div>
        <Input className="inputField" value={userCountry} />
      </div> */}
    </div>
  </MotionWrapper>
</>
  return {GeneralSettingsComponent,settingsVals};
}

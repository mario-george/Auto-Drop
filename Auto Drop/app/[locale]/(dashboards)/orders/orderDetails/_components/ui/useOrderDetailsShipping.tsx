import RoundedCardWrapper from "@/app/[locale]/(dashboards)/_components/shared/ui/RoundedCardWrapper";
import HeaderText from "@/app/[locale]/(dashboards)/wallet/_components/HeaderText";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AttachSVG from "../images/AttachSVG";
import './order-details.css'
interface OrderDetailsShippingProps {
  shippingText: string;
  shippingType: string;
  withLogo: string;
  attachALogo: string;
  shippedWPack: string;
  packagingBag: string;
  cartoon: string;
  attachAnInvoice: string;
  placeALogo: string;
  supplierShipping: string;
  estimatedDuration: string;
  shippingCompanyName: string;
  locale: string;
  withInvoice :string
}

export default function useOrderDetailsShipping({
  shippingText,
  shippingType,
  withLogo,
  attachALogo,
  shippedWPack,
  packagingBag,
  cartoon,
  attachAnInvoice,
  placeALogo,
  supplierShipping,
  estimatedDuration,
  shippingCompanyName,
  locale,withInvoice
}: OrderDetailsShippingProps) {
  const [shippingChoice, setShippingChoice] = useState<
    "cartoon" | "packagingBag"
  >("cartoon");
  const [selectedInvoiceType, setSelectedInvoiceType] = useState<
  "withInvoice"
>("withInvoice");
const [selectedLogoType, setSelectedLogoType] = useState<
"withLogo"
>("withLogo");

  const [shippingSelectedType, setShippingSelectedType] =
    useState<string>("shippedWPack");
    
  let HeaderTextProps = {
    isAr: locale === "ar",
    title: shippingText,
  };
  const sectionHeader = (title: string) => {
    return (
      <div className="text-xs dark:text-lg dark:text-white text-[#2e464f]">
        {title}
      </div>
    );
  };
  let AttachButton = (title: string, handler: () => void) => {
    return (
      <div className="flex items-center space-s-3 bg-[#edf5f9] p-2 rounded-md lap:max-w-[50%]">
        <AttachSVG />
        <p>

        {title}
        </p>
      </div>
    );
  };
  let ShippingHeader = <HeaderText {...HeaderTextProps} />;
  let OrderShipping = (
    <>
      {ShippingHeader}

      <RoundedCardWrapper>
      <div className="grid grid-cols-1 min-w-full px-3 lap:grid-cols-4 ">
      <div className="flex flex-col spacy-y-3 col-span-3">
        
        <div className="shippingSection">
          <div>{sectionHeader(shippingType)}</div>
          <Select
            onValueChange={(value: any) => {
              setShippingSelectedType(value);
            }}
            value={shippingSelectedType}
          >
            <SelectTrigger className="bg-[#edf5f9] dark:text-black">
              <SelectValue
                className=" dark:text-[#253439]"
                placeholder={shippedWPack}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="shippedWPack">{shippedWPack}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <RadioGroup
            className="grid grid-cols-1 ml:grid-cols-2 gap-2 tab:my-0 my-2 ml:my-3 w-full"
            onChange={(value: string) => {
              setShippingChoice(value as "cartoon" | "packagingBag");
            }}
            value={shippingChoice}
          >
            <div className="flex items-center space-x-2  bg-[#edf5f9] p-2 rounded-md">
              <Radio value="packagingBag">
                <div className=" text-xs dark:text-black whitespace-nowrap">
                  {packagingBag}
                </div>
              </Radio>
            </div>
            <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
              <Radio value="cartoon">
                <div className="text-xs  dark:text-black whitespace-nowrap">
                  {cartoon}
                </div>
              </Radio>
            </div>
          </RadioGroup>
        </div>
        <Separator />
        <div className="shippingSection">
          <div>{sectionHeader(placeALogo)}</div>
          <Select
            onValueChange={(value: any) => {
              setSelectedLogoType(value);
            }}
            value={selectedLogoType}
          >
            <SelectTrigger className="bg-[#edf5f9] dark:text-black">
              <SelectValue
                className=" dark:text-[#253439]"
                placeholder={withLogo}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="withLogo">{withLogo}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {AttachButton(attachALogo, () => {})}
        </div>
        <Separator />
        <div className="shippingSection">
          <div>{sectionHeader(attachAnInvoice)}</div>
          <Select
            onValueChange={(value: any) => {
              setSelectedInvoiceType(value);
            }}
            value={selectedInvoiceType}
          >
            <SelectTrigger className="bg-[#edf5f9] dark:text-black">
              <SelectValue
                className=" dark:text-[#253439]"
                placeholder={withInvoice}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="withInvoice">{withInvoice}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {AttachButton(attachAnInvoice, () => {})}
        </div>
      </div>
        <div>
          <div className="flex flex-col space-y-3">
            {sectionHeader(supplierShipping)}
          </div>
        </div>
      </div>
      </RoundedCardWrapper>
    </>
  );
  return { OrderShipping };
}
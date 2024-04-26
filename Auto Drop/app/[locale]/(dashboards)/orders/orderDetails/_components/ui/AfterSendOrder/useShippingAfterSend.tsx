import React from "react";
import { ShippingStatusAfterSend } from "./ShippingStatusAfterSend";
import TableCircleSVG from '../../images/TableCircleSVG';

interface ShippingAfterSendProps {
  translationMessages: { [key: string]: string };
  tracking_order_id?:number
  currStatus?:string
}

interface ShippingTableHeaderProps{
  aliexpressText :string
  number :string
  expectedDurationText :string
  expectedDuration:string|number
  days:string
}
const ShippingTableHeader = ({aliexpressText,number,expectedDurationText,expectedDuration,days}:ShippingTableHeaderProps)=>{
  return <>
    <div className="bg-[#ECEDEE] rounded-xl py-4 px-2 text-sm">
    
          <div className="flex flex-row space-s-3 items-center ">
            <span>
              {aliexpressText}
            </span>
            <span>
              {number}
            </span>

            <span>
              {expectedDurationText}
            </span>
                  <span>
              {expectedDuration}  {" "+days}
            </span>
        </div>
        </div>
        </>
} 
export default function useShippingAfterSend(props: ShippingAfterSendProps) {
  let { currStatus} = props
  let {
    localTracking,
    internationalTracking,
    shipComHomePage,
    underwayNow,
    contactShipCom,
    shippingInfo,
    expectedDuration,
    websiteOrderNumber,
    notYet,
    orderNumberInWebsite,
    shipStatus,
    supplier,
    Warehouse,
    client,
  } = props.translationMessages;
  let {
    leavingClassCenter,
    delByLocal,
    comCustomsCl,
    customClIm,
    access,
    leave,
    leavingCustoms,aliexpress,days
  } = props.translationMessages;
  let optionsArrived = Array(7).fill(true);
let optionsArray = [leavingClassCenter 
    ,     delByLocal
    ,     comCustomsCl
    ,     customClIm
    ,     access
    ,     leave
    ,     leavingCustoms

]
  let ShippingStatusAfterSendProps = {
    shipStatus,
    supplier,
    Warehouse,
    client,
  };
  let dummyDate = "2023-12-18 02:25 [GMT+3] "
  let ShippingAfterSendTable = (
    <div>
      <div className="flex flex-col dark:text-white">
        <div className="flex space-s-4 font-semibold text-sm dark:text-white">
          <p>
            {websiteOrderNumber} {props.tracking_order_id ?? 0}
          </p>
          <p className="underline text-[#008767]">{shipComHomePage}</p>
          <p className="underline">{contactShipCom}!</p>
        </div>
        <div className="flex flex-col bg-white rounded-lg text-[#253439]  dark:bg-[#2e464f]">
      {ShippingTableHeader({expectedDurationText:expectedDuration,number:"CDT20204854157",aliexpressText:aliexpress,expectedDuration:"10",days})}
    
    <div className="grid grid-cols-8 gap-2 text-sm">

      {optionsArrived.map((underway:boolean,index:number)=>{
        
        return <div className="grid grid-cols-8 col-span-full gap-2 p-3 dark:text-white" key={index}>
<span className="col-span-4 flex space-s-2 items-center">

  <span>


<TableCircleSVG/>
  </span>
  <span>

{optionsArray?.[index]}
  </span>
</span>
<span className="col-span-2 text-[#2534397A]/50 dark:text-white">

{dummyDate}

</span>
{underway ? <>
<span className="text-[#008767] col-span-2"> {underwayNow}</span>
</> : <>
<span className="text-[#2534397A]/50 col-span-2"> {notYet}</span>
</>}
</div>

})}
</div>
    </div>
      </div>
    </div>
  );
  let ShippingAfterSendComponent = (
    <div className="flex flex-col space-y-2 dark:text-white">
      <p>{shippingInfo}</p>
      <div className="flex flex-col space-y-3 lap:space-y-0 lap:flex-row lap:space-s-3">
        

        {ShippingAfterSendTable}
        <ShippingStatusAfterSend {...ShippingStatusAfterSendProps} />
      </div>
    </div>
  );
  if(currStatus==="created" || !props.tracking_order_id){
    ShippingAfterSendComponent = <></>
  }
  return { ShippingAfterSendComponent };
}

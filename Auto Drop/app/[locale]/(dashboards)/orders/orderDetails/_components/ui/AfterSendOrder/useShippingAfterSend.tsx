import React from 'react'
import { ShippingStatusAfterSend } from './ShippingStatusAfterSend';

interface ShippingAfterSendProps {
  translationMessages : {[key:string]:string}
  

}

export default function useShippingAfterSend(props: ShippingAfterSendProps) {
  let { localTracking, internationalTracking, shipComHomePage, underwayNow, contactShipCom, expectedDuration, shippingInfo, websiteOrderNumber, notYet,orderNumberInWebsite,
    shipStatus,supplier,Warehouse,client } = props.translationMessages;
  let ShippingStatusAfterSendProps = {
    shipStatus,supplier,Warehouse,client
  
  }
  let  ShippingAfterSendTable= (
    <div>
      <div className="flex flex-col">
        <div className="flex space-s-4 font-semibold">
          <p>
{websiteOrderNumber} {orderNumberInWebsite ?? 0 }
          </p>
          <p className='underline text-[#008767]'>
{shipComHomePage}
          </p>
          <p className='underline'>
{contactShipCom}!
          </p>
        </div>
      </div>
    </div>
  )
  let ShippingAfterSendComponent =   <div className="flex flex-col space-y-2">
  <p>
    {shippingInfo}
  </p>
  <div className="flex space-s-3">
    Button
  </div>
{ShippingAfterSendTable}
<ShippingStatusAfterSend {...ShippingStatusAfterSendProps}/>
</div>
  return { ShippingAfterSendComponent }
}

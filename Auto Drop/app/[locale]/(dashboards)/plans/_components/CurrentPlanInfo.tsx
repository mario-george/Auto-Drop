
import { Progress } from '@chakra-ui/react'
interface CurrentPlanInfoProps{
  planName:string
    remainingProducts:number
    remainingProductsText:string
    remainingOrders:number
    remainingOrdersText:string
    subscriptionDateText:string
    subscriptionExpirationDateText:string
    locale : string
    subscriptionStart:string
    subscriptionExpiry:string
    totalProductsLimit : number
    totalOrdersLimit  : number
}

export default function CurrentPlanInfo (props:CurrentPlanInfoProps){
const {planName,remainingProducts,remainingProductsText,remainingOrders,remainingOrdersText,subscriptionDateText,subscriptionExpirationDateText,locale,subscriptionStart,subscriptionExpiry,
  totalProductsLimit,totalOrdersLimit
} = props
let hasDateDesc = true
if(!subscriptionExpiry){
  hasDateDesc = false
}

let prodPercent = Math.round((remainingProducts / totalProductsLimit)*100)
let orderPercent = Math.round((remainingOrders / totalOrdersLimit)*100)
const formatDate  = (dateStr:string)=>{
let date = new Date(dateStr);

let options: Intl.DateTimeFormatOptions = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};
let formattedDate = date.toLocaleDateString("en-US", options);
return formattedDate

}
  return   <div className='px-6 my-6'>

  <div className=" flex bg-white lap:flex flex-col font-bold text-[20px] rounded-lg shadow  ">
      {/*     <span>"totalProductsLimit" {totalProductsLimit}</span>
          <span>"totalOrdersLimit" {totalOrdersLimit}</span>
          <span>"remainingOrders" {remainingOrders}</span>
          <span>"remainingProducts" {remainingProducts}</span>
          <span>"subscriptionStart" {subscriptionStart}</span>
          <span>"subscriptionExpiry" {subscriptionExpiry}</span> */}
          <div className="px-3">
    <span className="font-bold text-[32px] mb-1 ">{planName}</span>
    <div className="grid grid-rows-2 gap-3">
      <div className="flex items-center space-s-2 mb-3">
        <>
          <span>{remainingProductsText}  {remainingProducts} / {totalProductsLimit}</span>
    
          <Progress
            dir={`${locale == "ar" ? "rtl" : "ltr"}`}
            value={prodPercent}
            className="w-[60%]"
          />

        </>
      </div>
      <div className="flex items-center space-s-2">
        <span>{remainingOrdersText}  {remainingOrders} / {totalOrdersLimit}</span>
        <Progress
          dir={`${locale == "ar" ? "rtl" : "ltr"}`}
          value={orderPercent}
          className="w-[60%]"
        />
      </div>
      </div>
      </div>
 {hasDateDesc && 
 
 
      <div className="bg-[#eaebec]  flex flex-col text-[15px] tab:flex-row justify-between font-normal tab:text-[20px] px-4 rounded-lg py-4 ">
        <div>{subscriptionDateText} {formatDate(subscriptionStart )}</div>
        <div>{subscriptionExpirationDateText}  {formatDate(subscriptionExpiry )}</div>
      </div>
 }
  </div>
  </div>
}
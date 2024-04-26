import HeaderTwoPartSection from "@/app/[locale]/(dashboards)/_components/shared/ui/HeaderTwoPartsSection";
import VectorSVG from "../images/VectorSVG";
import { Button } from '@chakra-ui/react';

interface OrderStatusHeaderProps {
    orderStatus: string;
    order_id: string | number;
    orderNumberText: string;
    locale: string;
  }

interface OrderDifferentStatusListProps{
    create:string
    completed:string
    prepare:string
    review:string
    deliver:string
}
  export const OrderDifferentStatusList = (props:OrderDifferentStatusListProps)=>{
let {create,completed,prepare,review,deliver} = props
const statusList = [
    {status:create,color:'FACC15'},
    {status:completed,color:'916F16'},
    {status:prepare,color:'3F51B5'},
    {status:review,color:'D804FC'},
    {status:deliver,color:'ODED74'},
]
let currentStatus = 'create'
return <div className="container p-6 bgWD flex justify-center">
{statusList.map((item,index)=>{
let {status,color} = item
    return <div key={index} className="">
<Button className={`flex-1 !text-white !bg-[#${color}]`} disabled={currentStatus!==status}>{status}</Button>
    </div>
})}
</div>
  }
  export function OrderStatusHeader(props: OrderStatusHeaderProps) {
    let { orderStatus, locale, orderNumberText, order_id } = props;
    let isAr = locale === "ar";
    let secondElement = (
      <div className="flex space-s-6 ">
        <div className="bg-white shadow rounded-xl px-4 py-2">
          <VectorSVG />
        </div>
        <div className="bg-white shadow rounded-xl flex space-s-4 px-4 py-2 items-center text-xs tab:text-sm dark:text-[#253439]">
          <div>{orderNumberText}</div>
          <div>#{order_id}</div>
        </div>
      </div>
    );
    return (
      <>
      <div className="flex flex-col spacy-y-3">


        <HeaderTwoPartSection
          isAr={locale == "ar"}
          title={orderStatus}
          secondElement={secondElement}
        />
      </div>
  
      </>
    );
  }
import { Button } from "@chakra-ui/react";
import { StatusDetailsHeader } from "../OrderedProduct";
import DoneCircleSVG from "../images/DoneCircleSVG";
import UnDoneCircleSVG from "../images/UnDoneCircleSVG";
import SupplierSVG from "../images/SupplierSVG";
import ClientRecievedSVG from "../images/ClientRecievedSVG";
import WarehouseSVG from "../images/WarehouseSVG";
import DashedLineShippingStatus from "../images/DashedLineShippingStatusSVG";

interface ShippingStatusAfterSendProps {
  shipStatus: string;
  supplier: string;
  Warehouse: string;
  client: string;
}
interface OrderStatusAfterSendProps {
  currStatus:
    | "created"
    | "in_review"
    | "in_transit"
    | "in_progress"
    | "canceled"
    | "completed";
  deliveryInProgess: string;
  delivered: string;
  orderStatus: string;
  created: string;
  inReview: string;
  InProgress: string;
  order_id: string | number;
  orderNumberText: string;
  locale: string;
}
export const ShippingStatusAfterSend = (
  props: ShippingStatusAfterSendProps
) => {
  const { shipStatus, supplier, Warehouse, client } = props;

  return (
    <div className="p-3 ">
      <p className="text-lg text-gray-500 dark:text-white">{shipStatus}</p>

      <div className="grid grid-cols-3 border rounded-xl border-gray-500 p-3 dark:text-white">
        <div className="flex flex-col justify-between space-y-6 ">
          <p className="text-sm text-gray-500 dark:text-white">{supplier}</p>
          <p className="text-sm text-gray-500 dark:text-white">{Warehouse}</p>
          <p className="text-sm text-gray-500 dark:text-white">{client}</p>
        </div>
        <div className="flex flex-col justify-between space-y-3">
          <DoneCircleSVG />
          <DashedLineShippingStatus/>
          <UnDoneCircleSVG />
          <DashedLineShippingStatus/>
          <UnDoneCircleSVG />
        </div>
        <div className="flex flex-col justify-between space-y-6">
          <SupplierSVG />
          <ClientRecievedSVG />
          <WarehouseSVG />
        </div>
      </div>
    </div>
  );
};

export const OrderStatusAfterSend = (props: OrderStatusAfterSendProps) => {
  const {
    currStatus,
    orderStatus,
    deliveryInProgess,
    delivered,
    created,
    inReview,
    InProgress,
    order_id,
    orderNumberText,
    locale,
  } = props;

   if(!currStatus || currStatus == "created"){
    return <></>
  } 

  let buttonC = " rounded-lg px-3 h-8 dark:text-black text-white px-6 ";
  let buttonClasses = " rounded-lg px-3 h-8 dark:text-black text-white px-6 ";

  let currStatusText = created;
  switch (currStatus) {
 /*    case "created":
      currStatusText = created;
      buttonC += " text-[#253439] bg-[#FACC15] ";
      break; */
    case "in_review":
      currStatusText = inReview;
      buttonC += " text-[#008767] bg-[#916F16] px-5 ";

      break;
    case "in_progress":
      currStatusText = InProgress;
      buttonC += " text-[#c1121f] bg-[#3F51B5] px-6 ";

      break;
    case "in_transit":
      currStatusText = deliveryInProgess;
      buttonC += " text-[#c1121f] bg-[#D804FC] ";

      break;

    case "completed":
      currStatusText = delivered;
      buttonC += " text-[#c1121f] bg-[#ffd6d9] px-6 ";

      break;
    default:
      currStatusText = orderStatus;
      break;
  }
  interface IStatusButton {
    status: string;
    text: string;
    active: string;
  }
  let statusButtonList: IStatusButton[] = [
    { status: "created", text: created, active: "!bg-[#FACC15]" },
    { status: "in_review", text: inReview, active: "!bg-[#916F16]" },

    { status: "in_progress", text: InProgress, active: "!bg-[#3F51B5]" },
    { status: "in_transit", text: deliveryInProgess, active: "!bg-[#D804FC]" },
    { status: "completed", text: delivered, active: "!bg-[#ffd6d9]" },
  ];
  let StatusDetailsHeaderProps = {
    orderStatus,
    order_id,
    orderNumberText,
    locale,
  };
  return (
    <>
      <StatusDetailsHeader {...StatusDetailsHeaderProps} />
      <div className="p-3 bg-white  flex lap:space-s-6 flex-col lap:flex-row lap:space-y-0 space-y-3">
        {statusButtonList.map((buttonEL: IStatusButton,index:number) => {
          let { status, text, active } = buttonEL;

          return (
            <Button
              className={`flex-1 hover:cursor-auto  ${buttonClasses} ${
                currStatus == status ? `${active} !text-white`:`!text-gray-500 hover:!bg-[#EDF2F7]`
              }`}
              key={index}
            >
              {text}
            </Button>
          );
        })}
      </div>
    </>
  );
};

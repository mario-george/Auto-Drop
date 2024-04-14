"use client"
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import CurrentPlanInfo from "./CurrentPlanInfo";
interface IPlanRenderer{
    locale:string
    remainingProductsText:string
    remainingOrdersText:string
    subscriptionExpirationDateText: string
    subscriptionDateText :string
}
export default function usePlanRenderer(props:IPlanRenderer) {
  const {locale,remainingProductsText,remainingOrdersText,subscriptionExpirationDateText,subscriptionDateText} = props
    const user = useSelector((state: RootState) => state.user);
  let {
    planName,
    subscriptionStart,
    subscriptionExpiry,
    subscriptionOrdersLimit : remainingOrders,
    subscriptionProductsLimit: remainingProducts,totalProductsLimit,totalOrdersLimit
  } = user;
  let CurrentPlanInfoProps ={
    planName,
    remainingProducts,
    remainingOrders,remainingProductsText,remainingOrdersText,
    subscriptionExpirationDateText,subscriptionDateText
    ,locale
  ,    subscriptionStart,
  subscriptionExpiry,totalProductsLimit,totalOrdersLimit
  } 
let PlanComponent = <>
<CurrentPlanInfo {...CurrentPlanInfoProps}/>
</>
  return {PlanComponent};
}

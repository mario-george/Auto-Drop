"use client"
import usePlanRenderer from "./usePlanRenderer";
export default function PlanSection (props){
    const {PlanComponent} = usePlanRenderer({...props});

    return <>
  {PlanComponent}
    
    </>
}
"use client"
import usePlanRenderer from "./usePlanRenderer";
export default function PlanSection (props:any){
    const {PlanComponent} = usePlanRenderer({...props});

    return <>
  {PlanComponent}
    
    </>
}
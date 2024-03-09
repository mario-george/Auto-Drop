import { useEffect, useState } from "react";

interface Option {
  name: string;
  checkboxes: boolean[];
}

export default function useOptionHook({ product }: any) {
  const [optionsSelected, setOptionsSelected] = useState<Option[]>([]);
  const [checkboxesSelected, setCheckBoxesSelected] = useState<Option[]>([]);
  const optionCheckHandler = (OptionIndex: number, valueIndex: number) => {
    console.log("executed");
    console.log("executed");
    console.log("executed");
    console.log("executed");
    console.log("OptionIndex", OptionIndex);
    console.log("valueIndex", valueIndex);
    setOptionsSelected((prev: any) => {
      const updatedOptions = [...prev];
      updatedOptions[OptionIndex].checkboxes[valueIndex] =
        !updatedOptions[OptionIndex].checkboxes[valueIndex];
      console.log("updatedOptions", updatedOptions);
      return updatedOptions;
    });
  };
  const checkboxHandler =(OptionIndex:number,valueIndex:number,val:boolean)=>{
    setCheckBoxesSelected((prev: any) => {
      const updatedCheckboxes = [...prev];
      let choosenCheckbox=   updatedCheckboxes?.[OptionIndex]?.[valueIndex]
      updatedCheckboxes[OptionIndex][valueIndex]=!val
      console.log("updatedCheckboxes", updatedCheckboxes);
      return updatedCheckboxes;
    });
  }
  useEffect(() => {
    if (product?.options === undefined) return;
    if (product?.options.length !== optionsSelected.length) {
      let checkboxArr = product?.options.map((option:any)=>option.values.length).map((optionsNumber:any)=>Array(optionsNumber).fill(true))
      setCheckBoxesSelected(checkboxArr)
      let newOpt = product?.options?.map((option: any) => {
        let { name, values } = option;
        let checkboxes = Array(values.length).fill(true);
        return { name, checkboxes, values };
      });
      setOptionsSelected((prev: any) => {
        return newOpt;
      });
    }
  }, [product]);
  return { optionsSelected, setOptionsSelected, optionCheckHandler ,checkboxesSelected,checkboxHandler};
}

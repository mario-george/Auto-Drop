import { useEffect, useState } from "react";

interface Option {
  name: string;
  checkboxes: boolean[];
}

export default function useOptionHook({ product }: any) {
  const [optionsSelected, setOptionsSelected] = useState<Option[]>([]);
  const optionCheckHandler = (OptionIndex: number, valueIndex: number) => {
    console.log("OptionIndex",OptionIndex)
    console.log("valueIndex",valueIndex)
    setOptionsSelected((prev: any) => {
      const updatedOptions = [...prev];
      console.log("updatedOptions[OptionIndex].checkboxes[valueIndex]",updatedOptions[OptionIndex].checkboxes[valueIndex])
      console.log("!updatedOptions[OptionIndex].checkboxes[valueIndex]",!updatedOptions[OptionIndex].checkboxes[valueIndex])
      updatedOptions[OptionIndex].checkboxes[valueIndex] =
        !updatedOptions[OptionIndex].checkboxes[valueIndex];
        console.log("updatedOptions",updatedOptions)
      return updatedOptions;
    });
  };
  useEffect(() => {
    let newOpt = product?.options?.map((option: any) => {
      let { name, values } = option;
      let checkboxes = Array(values.length).fill(true);
      return { name, checkboxes ,values};
    });
    setOptionsSelected((prev: any) => {
      return newOpt;
    });
  }, [product]);
  return { optionsSelected, setOptionsSelected, optionCheckHandler };
}

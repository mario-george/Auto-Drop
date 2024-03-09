import { useEffect, useState } from "react";

interface Option {
  name: string;
  checkboxes: boolean[];
}

export default function useOptionHook({ options }: any) {
  const [optionsSelected, setOptionsSelected] = useState<Option[]>([]);
  const optionCheckHandler = (OptionIndex: number, valueIndex: number) => {
    setOptionsSelected((prev: any) => {
      const updatedOptions = [...prev];
      updatedOptions[OptionIndex].checkboxes[valueIndex] =
        !updatedOptions[OptionIndex].checkboxes[valueIndex];
      return updatedOptions;
    });
  };
  useEffect(() => {
    let newOpt = options?.map((option: any) => {
      let { name, values } = option;
      let checkboxes = Array(values.length).fill(true);
      return { name, checkboxes };
    });
    setOptionsSelected((prev: any) => {
      return newOpt;
    });
  }, [options]);
  return { optionsSelected, setOptionsSelected, optionCheckHandler };
}

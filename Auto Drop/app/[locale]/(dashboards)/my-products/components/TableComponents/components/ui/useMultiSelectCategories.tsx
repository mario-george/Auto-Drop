

import React, { useState,useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import axiosInstance from '@/app/[locale]/(dashboards)/_components/shared/AxiosInstance';
interface MultiSelectCategoriesProps {
  translationMessages:{[key:string]:string}
  category:string
}
const useMultiSelectCategories = ({translationMessages,category}: MultiSelectCategoriesProps
) => {


  const [categoriesList,setCategoriesList] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await axiosInstance.get("/salla/categories");
        // console.log(resp.data);
        if (resp.status < 300 && resp.status >= 200) {
          let fetchedCategories = resp.data.data
          setCategoriesList(fetchedCategories.map((category:any)=>{return {label:category.name,value:category.id}}));
        }
      } catch (err: any) {
        console.log(err?.response.data);
        console.log(err?.response.status);
        console.log(err?.response.headers);
      }
    };

    fetchCategories();
  }, []);
  const [selected, setSelected] = useState([]);
let MultiCategoriesSelectBox = 

    <div>
      {/*<pre>{JSON.stringify(selected)}</pre>*/}
      <MultiSelect
        options={categoriesList}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        className="dark:!text-black !text-sm !whitespace-nowrap"
        overrideStrings={{
          "selectSomeItems": translationMessages?.search +"....      ",
          "allItemsAreSelected": translationMessages?.allCategories,
          "selectAll": translationMessages?.selectAll,
          "search":translationMessages?.search,
        }}
        // allItemsAreSelected={"all 2222"}
/*         messages={{
          allItemsAreSelected: "All items",
          selectAll: "Select all",
          search: "Search",
          noItemsToDisplay: "No items to display",
          noneSelected: "None selected",
          itemSelected: "item selected",
          itemsSelected: "items selected",
        }} */
      />
    </div>
  return { selected,MultiCategoriesSelectBox}
};


export default useMultiSelectCategories
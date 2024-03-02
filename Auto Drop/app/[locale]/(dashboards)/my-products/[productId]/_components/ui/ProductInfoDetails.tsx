import React from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
export default function ProductInfoDetails({
  form,
  productName,
  productSku,
  prodNameTitlePlaceholder,
  inputClasses,
  prodNameTitle,
  sku,
  setErrorMsg,formValues,setFormValues
}: any) {
  return (
    <div>
      <div className="md:flex md:justify-between md:gap-5 items-center mb-3">
        <FormField
          control={form.control}
          name="prodName"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel className=" text-sm md:text-base">
                {prodNameTitle}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={prodNameTitlePlaceholder}
                  {...field}
                  id="firstName"
                  className={`shadow-sm text-sm md:text-base ${inputClasses} `}
                  onFocus={() => setErrorMsg(null)}
                  value={formValues.ProductName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(e.target.value);
                    setFormValues((prevVals: any) => {
                      return { ...prevVals, ProductName: e.target.value };
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:gap-2">
          <div>{sku}</div>
          <div>
            <Input
              className={`shadow-sm text-sm md:text-base ${inputClasses} `}
              value={productSku}
            />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}

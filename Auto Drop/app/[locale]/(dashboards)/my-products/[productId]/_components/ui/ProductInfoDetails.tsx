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
  setErrorMsg,
  formValues,
  setFormValues,
}: any) {
  return (
    <div>
      <div className="grid grid-cols-1 tab:grid-cols-2 space-y-5 tab:space-y-0  md:gap-5 items-center mb-3">
        <FormField
          control={form.control}
          name="prodName"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className=" text-sm md:text-base">
                {prodNameTitle}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={prodNameTitlePlaceholder}
                  {...field}
                  id="prodName"
                  className={`shadow-sm text-sm md:text-base ${inputClasses}`}
                  onFocus={() => setErrorMsg(null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 md:gap-2">
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

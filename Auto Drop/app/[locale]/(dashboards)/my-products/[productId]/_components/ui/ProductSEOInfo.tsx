import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ProductSEOInfo({
  SEOTitle,
  SEODescription,
  locale,
  metadataDesc,
  metadataTitle,
  setMetadataDesc,
  setMetadataTitle,
  form,
}: any) {
  return (
    <div>
      <div
        className={cn(
          "flex flex-col space-y-3 max-w-[95%]",
          locale === "ar" ? `text-right` : `text-left`
        )}
      >
        <FormField
          control={form.control}
          name="SEOTitleText"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel className="shadow-sm text-sm md:text-base">
                {SEOTitle}
              </FormLabel>
              <FormControl>
                <Textarea
                  className={`inputField `}
                  {...field}
                  id="SEOTitleText"
                  // value={metadataTitle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="SEODescription"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel className="shadow-sm text-sm md:text-base">
                {SEODescription}
              </FormLabel>
              <FormControl>
                <Textarea
                  className={`inputField `}
                  {...field}
                  id="SEODescription"
                  // value={metadataDesc}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*   <div>{SEOTitle}</div>
        <Textarea
          className={`inputField `}
          value={metadataTitle}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMetadataTitle(e.target.value);
          }}
        /> */}
    {/*     <div>{SEODescription}</div>
        <Textarea
          className={`inputField `}
          value={metadataDesc}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMetadataDesc(e.target.value);
          }}
        /> */}
       {/*  <div className="flex flex-col">
          <div></div>
        </div> */}
      </div>
      <div className="my-2 tab:my-4">
      <Separator />
    </div>
    </div>
  );
}

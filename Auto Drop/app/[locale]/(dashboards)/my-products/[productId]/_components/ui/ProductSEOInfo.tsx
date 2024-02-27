import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ProductSEOInfo({
  SEOTitle,
  SEODescription,
  locale,
  metadata_description,
  metadata_title,setMetadataDesc,setMetadataTitle
}: any) {
  return (
    <div>
      <div
        className={cn(
          "flex flex-col space-y-3 max-w-[95%]",
          locale === "ar" ? `text-right` : `text-left`
        )}
      >
        <div>{SEOTitle}</div>
        <Input className={`inputField `} value={metadata_title} onChange={(e:any)=>{setMetadataTitle(e.target.value)}} />
        <div>{SEODescription}</div>
        <Input className={`inputField `} value={metadata_description} />
        <div className="flex flex-col">
          <div></div>
        </div>
      </div>
      <Separator />
    </div>
  );
}

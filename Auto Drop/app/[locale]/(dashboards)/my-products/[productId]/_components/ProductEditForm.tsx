"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import ProductEditHeader from "./ProductEditHeader";
import MotionWrapperExit from "../../../_components/shared/MotionWrapperExit";
import { useLocale } from "next-intl";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface ProductEditFormProps {
  prodNameTitle: string;
  prodNameTitlePlaceholder: string;
  sku: string;
  shipping: string;
  description: string;
  to: string;
  with: string;
  size: string;
  price: string;
  params: { productId: string };
  invalidProdName: string;
  invalidSEODescription: string;
  invalidSEOTitle: string;
  invalidDescription: string;
}
export default function ProductEditForm(props: ProductEditFormProps) {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  let {
    invalidProdName,
    invalidSEODescription,
    invalidSEOTitle,
    invalidDescription,
    prodNameTitle,
    prodNameTitlePlaceholder,
  } = props;
  const locale = useLocale();
  const formSchema = z.object({
    prodName: z.string().min(2, invalidProdName).max(100),
    SEOTitle: z.string().min(2, invalidSEOTitle).max(100),
    SEOescription: z.string().min(2, invalidSEODescription).max(100),
    description: z.string().min(2, invalidDescription).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prodName: "",
      SEOTitle: "",
      SEOescription: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.patch(
        "/aliexpress/product/editProduct/" + props.params.productId
      );

      if (response.status < 300 && response.status >= 200) {
        console.log("Product updated");
      } else {
      }
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(product);
  return (
    <>
        <div className="bg-white rounded-lg shadow container">
          <div className="flex">
            <Image
              src={product?.images[0].original}
              alt="Product Image"
              width={518}
              height={691}
            />
            <div className="flex flex-col "></div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4 lg:w-3/4 w-full"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="md:flex md:justify-between md:gap-5">
                <FormField
                  control={form.control}
                  name="prodName"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel className="shadow-sm text-sm md:text-base">
                        {prodNameTitle}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={prodNameTitlePlaceholder}
                          {...field}
                          id="firstName"
                          className="shadow-sm text-sm md:text-base"
                          onFocus={() => setErrorMsg(null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2E3C41] hover:text-[#2E3C41]
          hover:bg-transparent hover:border hover:border-[#2E3C41] text-sm md:text-base"
                disabled={isLoading}
              >
                {/* {isLoading ? <Loader2 className=" animate-spin" /> : signup} */}
              </Button>
              {/*      {errorMsg && (
                <div className="text-center text-red-400">{errorMsg}</div>
              )} */}
            </form>
          </Form>
        </div>
    </>
  );
}

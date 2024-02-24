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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductOptions from "./ui/ProductOptions";
import ProductImageRenderer from "./ui/ProductImageRenderer";

import { cn } from "@/lib/utils";
interface ProductEditFormProps {
  prodNameTitle: string;
  prodNameTitlePlaceholder: string;
  sku: string;
  shipping: string;
  description: string;
  availableQuantity: string;
  to: string;
  with: string;
  size: string;
  price: string;
  params: { productId: string };
  invalidProdName: string;
  invalidSEODescription: string;
  invalidSEOTitle: string;
  invalidDescription: string;
  product: any;
  shippingIncluded: string;
  profitType: string;
  originalPrice: string;
  piecePrice: string;
  profit: string;
  withoutShipping: string;
  percentage: string;
  number: string;
  category: string;
  editedPrice: string;
  nameOfShippingComp: string;
  durationToDeliver: string;
  tag: string;
  value: string;
  currentPiece: string;
  SEOTitle: string;
  SEODescription: string;
  color: string;
}

export default function ProductEditForm(props: ProductEditFormProps) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
console.log(selectedCategory)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await axiosInstance.get("/salla/categories");
        console.log(resp.data);
        if (resp.status < 300 && resp.status >= 200) {
          setCategoriesList(resp.data.data);
        }
      } catch (err: any) {
        console.log(err?.response.data);
        console.log(err?.response.status);
        console.log(err?.response.headers);
      }
    };
    fetchCategories();
  }, []);
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
    product,
    sku,
    availableQuantity,
    currentPiece,
    piecePrice,
    originalPrice,
    shippingIncluded,
    withoutShipping,
    profitType,
    editedPrice,
    tag,
    category,
    SEOTitle,
    SEODescription,
    color,
    size,
    shipping,
    description,
    percentage,
    to,
    number,
    profit,
  } = props;

  let inputClasses = `bg-[#edf5f9] text-[#253439] rounded-lg shadow`;
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
  if (!product) {
    return <div>Fetching Product...</div>;
  }
  console.log(product);
  return (
    <>
      <div className="bg-white rounded-lg shadow container p-6 lap:flex min-w-full justify-between  ">
        {/* <div>
          <Image
            src={product?.images[0].original}
            alt="Product Image"
            width={518}
            height={691}
            className="rounded-md mx-auto"
          />{" "}
        </div> */}
        <ProductImageRenderer product={product} />
        <div className="flex flex-col min-w-[55%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4  "
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="md:flex md:justify-between md:gap-5 items-center">
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
                          value={product?.name}
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
                      value={product?.sku}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-s-2">
                <span>{availableQuantity}</span>
                <span className="text-[#8d9598]">
                  {product.quantity} {currentPiece}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col min-w-full">
                <span>{piecePrice}</span>
                <div className="grid grid-cols-2 gap-4   my-4 min-w-full">
                  <span className="col-span-2">{originalPrice}</span>
                  <Input
                    className={`shadow-sm text-sm md:text-base bg-[#edf5f9] ${inputClasses} `}
                    value={product?.price}
                  />{" "}
                  <RadioGroup
                    defaultValue="shippingIncluded"
                    className="!flex space-s-3 w-full"
                  >
                    <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
                      <RadioGroupItem value="withoutShipping" id="r1" />
                      <Label className="whitespace-nowrap " htmlFor="r1">
                        {withoutShipping}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
                      <RadioGroupItem value="shippingIncluded" id="r2" />
                      <Label className="whitespace-nowrap" htmlFor="r2">
                        {shippingIncluded}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4  my-4 min-w-full">
                  <span className="col-span-2">{profitType}</span>
                  <Select>
                    <SelectTrigger className="bg-[#edf5f9]">
                      <SelectValue placeholder={percentage} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="percentage">{percentage}</SelectItem>
                        <SelectItem value="number">{number}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    className={`shadow-sm text-sm md:text-base   ${inputClasses} `}
                    value={product?.price}
                    placeholder={percentage}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 my-4 min-w-full">
                  <span>{editedPrice}</span>
                  <span>{profit}</span>
                  <Input
                    className={`shadow-sm text-sm md:text-base min-w-[60%] ${inputClasses} `}
                    value={product?.price}
                  />
                  <Input
                    className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#008767] ${inputClasses} `}
                    value={product?.price}
                  />
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4 my-4 min-w-full">
                  <div className="border-l border-gray-400">
                    <span>{category}</span>{" "}
                    <Select>
                      <SelectTrigger className="mt-3 max-w-[90%] bg-[#edf5f9] text-black text-right">
                        <SelectValue placeholder={category} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{category}</SelectLabel>

                          {categoriesList.map(
                            (category: { id: string; name: string }) => (
                              <SelectItem key={category.id} value={category.name}           onClick={() => setSelectedCategory(category.name)}
                              >
                                {category.name}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>{" "}
                  </div>
                  <div>
                    <span>{tag}</span>{" "}
                    <Select>
                      <SelectTrigger className="mt-3 bg-[#edf5f9] max-w-[90%]">
                        <SelectValue placeholder={tag} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{tag}</SelectLabel>
                          {/*           <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>{" "}
                  </div>
                </div>

                <Separator />
                <div
                  className={cn(
                    "flex flex-col space-y-3 max-w-[95%]",
                    locale === "ar" ? `text-right` : `text-left`
                  )}
                >
                  <div>{SEOTitle}</div>
                  <Input
                    className={`shadow-sm text-sm md:text-base min-w-[60%]  ${inputClasses} `}
                  />
                  <div>{SEODescription}</div>
                  <Input
                    className={`shadow-sm text-sm md:text-base min-w-[60%]  ${inputClasses} `}
                  />
                  <div className="flex flex-col">
                    <div></div>
                  </div>
                </div>
                <Separator />
                <ProductOptions options={product.options} />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

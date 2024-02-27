"use client";
import { useEffect, useRef, useState } from "react";
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
import "./styles/styles.css";
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
import ProductCategoriesTags from "./ui/ProductCategoriesTags";

import { cn } from "@/lib/utils";
import ProductInfoDetails from "./ui/ProductInfoDetails";
import ProductPriceDetails from "./ui/ProductPriceDetails";
import ProductSEOInfo from "./ui/ProductSEOInfo";
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
  addOfferPrice: string;
  offerPrice: string;
}

export default function ProductEditForm(props: ProductEditFormProps) {
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
    addOfferPrice,
    offerPrice,
  } = props;
  const [categoriesList, setCategoriesList] = useState([]);
  const [metadataTitle, setMetadataTitle] = useState("");
  const [metadataDesc, setMetadataDesc] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [profitChoosenType, setProfitChoosenType] = useState("percentage");
  let target_sale_price: any,
    target_original_price: any,
    vendor_commission: any,
    metadata_title: any,
    metadata_description: any;

  if (product) {
    ({
      target_sale_price,
      target_original_price,
      vendor_commission,
      metadata_title,
      metadata_description,
    } = product);
  }
  let commissionValInitial = vendor_commission || 0;

  let totalProfitInitial = (vendor_commission || 0) * target_sale_price;
  let finalPriceInitial =
    (vendor_commission || 0) * target_sale_price + target_sale_price;
  if (!product) {
    commissionValInitial = 0;
    totalProfitInitial = 0;
    finalPriceInitial = 0;
  }
  useEffect(() => {
    if (
      product &&
      (commissionVal == 0 || !commissionVal) &&
      (totalProfit == 0 || !totalProfit) &&
      (finalPrice == 0 || !finalPrice)
    ) {
      setCommissionVal(vendor_commission || 0);
      setTotalProfit((vendor_commission || 0) * target_sale_price);
      setFinalPrice(
        (vendor_commission || 0) * target_sale_price + target_sale_price
      );
      setMetadataDesc(metadata_description);
      setMetadataTitle(metadata_title);
    }
  }, [product]);
  const [commissionVal, setCommissionVal] = useState(
    product?.vendor_commission || 0
  );
  const [totalProfit, setTotalProfit] = useState(
    (product?.vendor_commission || 0) * product?.target_sale_price
  );
  const [finalPrice, setFinalPrice] = useState(
    (product?.vendor_commission || 0) * product?.target_sale_price +
      product?.target_sale_price
  );
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
  useEffect(() => {
    if (profitChoosenType == "percentage" || profitChoosenType == percentage) {
      setFinalPrice((finalPrice: any) => {
        return (
          (commissionVal / 100) * product?.target_sale_price +
          product?.target_sale_price
        );
      });
      setTotalProfit((prevTotalProfit: any) => {
        return (commissionVal / 100) * product?.target_sale_price;
      });
    } else {
      setFinalPrice((finalPrice: any) => {
        return commissionVal + product?.target_sale_price;
      });
      setTotalProfit((prevTotalProfit: any) => {
        return commissionVal;
      });
    }
  }, [totalProfit, profitChoosenType, commissionVal]);
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
  const productInfoProps = {
    form,
    productName: product?.name,
    productSku: product?.sku,
    prodNameTitlePlaceholder,
    inputClasses,
    prodNameTitle,
    sku,
    setErrorMsg,
  };
  const ProductPriceDetailsProps = {
    offerPrice,
    addOfferPrice,
    target_original_price: product.target_original_price,
  };

  const ProductSEOInfoProps = {
    SEOTitle,
    SEODescription,
    locale,
    metadataDesc,
    metadataTitle,
    setMetadataDesc,
    setMetadataTitle,
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow container p-6 lap:flex min-w-full justify-between  ">
        <ProductImageRenderer product={product} />
        <div className="flex flex-col min-w-[55%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col bg-[#F7F5F2] rounded-lg shadow-lg p-8 space-y-4  "
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <ProductInfoDetails {...productInfoProps} />

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
                  <Select
                    onValueChange={(value: any) => {
                      setProfitChoosenType(value);
                    }}
                  >
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
                  <div className=" flex items-center space-s-3">
                    <div className="relative mt-auto">
                      <Input
                        type="number"
                        className="pr-6"
                        value={commissionVal}
                        onChange={(e: any) => {
                          if (e.target.value) {
                            setCommissionVal(parseInt(e.target.value));
                          } else {
                            setCommissionVal(0);
                          }
                        }}
                      />
                      <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">
                        {profitChoosenType == "percentage" ? <>%</> : <></>}
                      </span>
                    </div>
                    {/* <Input
                      className={`shadow-sm text-sm md:text-base   ${inputClasses} `}
                      value={
                        totalProfit +
                        (profitChoosenType == "percentage" ? "%" : "")
                      }
                      placeholder={percentage}
                      onChange={(e:any) => {
                        setTotalProfit(e.target.value.replace(/\D/g, ''));                      }}
                    />
                    {profitChoosenType == "percentage" ? <>%</> : <></>} */}
                  </div>
                </div>
                <ProductPriceDetails {...ProductPriceDetailsProps} />
                <div className="grid grid-cols-2 gap-4 my-4 min-w-full">
                  <span>{editedPrice}</span>
                  <span>{profit}</span>
                  <Input
                    className={`shadow-sm text-sm md:text-base min-w-[60%] ${inputClasses} `}
                    value={finalPrice}
                  />
                  <Input
                    className={`shadow-sm text-sm md:text-base min-w-[60%] !text-[#008767] ${inputClasses} `}
                    value={totalProfit}
                  />
                </div>
                <Separator />

                <ProductCategoriesTags
                  category={category}
                  tag={tag}
                  setSelectedCategories={setSelectedCategories}
                  categoriesList={categoriesList}
                  selectedCategories={selectedCategories}
                />

                <Separator />
                <ProductSEOInfo {...ProductSEOInfoProps} />

                <ProductOptions options={product.options} />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

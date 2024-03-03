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
import Editor from "./ui/Editor";
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
  addToCart: string;
  uploadProduct: string;
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
    uploadProduct,
    addToCart,
  } = props;
  const [categoriesList, setCategoriesList] = useState([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [formValues, setFormValues] = useState<any>({ ProductName: "" });
  const [metadataTitle, setMetadataTitle] = useState("");
  const [metadataDesc, setMetadataDesc] = useState("");
  const [choosenColors, setChoosenColors] = useState<any>([]);
  const [choosenMaterials, setChoosenMaterials] = useState<any>([]);
  const [choosenSizes, setChoosenSizes] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [profitChoosenType, setProfitChoosenType] = useState("percentage");
  const [descriptionField, setDescriptionField] = useState(
    product?.description
  );
  const [showDiscountPrice, setShowDiscountPrice] = useState<boolean>(false);

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
      const newValues: any = {
        prodName: product?.name,
        SEOTitleText: metadata_title,
        SEODescription: metadata_description,
      };

      // Use the setValue method to update the form fields
      Object.keys(newValues).forEach((key: any) => {
        form.setValue(key, newValues[key]);
      });

      setFormValues((prevV: any) => {
        return { ...prevV, ProductName: product?.name };
      });
      let colorsOption = product?.options?.find(
        (option: any) =>
          option?.name?.includes("Color") || option?.name?.includes("color")
      );

      let materialsOption = product?.options?.find(
        (option: any) =>
          option?.name?.includes("Material") ||
          option?.name?.includes("material")
      );
      let sizeOptions = product?.options?.find(
        (option: any) =>
          option?.name?.includes("Size") || option?.name?.includes("size")
      );
      setDescriptionField(product?.description);
      setChoosenColors(
        Array.from({ length: colorsOption?.values?.length }, (_, i) => {
          return colorsOption?.values[i]?.selected || true;
        })
      );
      setChoosenMaterials(
        Array.from({ length: materialsOption?.values?.length }, (_, i) => {
          return materialsOption?.values[i]?.selected || true;
        })
      );
      setChoosenSizes(
        Array.from({ length: sizeOptions?.values?.length }, (_, i) => {
          return sizeOptions?.values[i]?.selected || true;
        })
      );
      setShowDiscountPrice(product?.showDiscountPrice || false);
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
    console.log(commissionVal);
    console.log(
      profitChoosenType == "percentage" || profitChoosenType == percentage
    );
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
    prodName: z.string().min(2, invalidProdName).max(300),
    SEOTitleText: z.string().min(2, invalidSEOTitle).max(70),
    SEODescription: z.string().min(2, invalidSEODescription).max(70),
    // description: z.string().min(2, invalidDescription).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prodName: formValues?.ProductName,
      SEOTitleText: metadataTitle,
      SEODescription: metadataDesc,
    },
  });

  const onSubmitHandler = async (data: z.infer<typeof formSchema>) => {
    console.log(data.SEOTitleText);
    console.log(data);
    console.log(data);
    console.log(data);
    setIsLoading(true);
    try {
      uploadProductHandler();
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
    formValues,
    setFormValues,
  };
  const ProductPriceDetailsProps = {
    offerPrice,
    addOfferPrice,
    editedPrice,
    profit,
    finalPrice,
    totalProfit,
    inputClasses,
    showDiscountPrice,
    setShowDiscountPrice,
  };

  const ProductSEOInfoProps = {
    SEOTitle,
    SEODescription,
    locale,
    metadataDesc,
    metadataTitle,
    setMetadataDesc,
    setMetadataTitle,
    form,
  };
  const ProductOptionsProps = {
    options: product.options,
    choosenSizes,
    choosenColors,
    setChoosenColors,
    setChoosenSizes,
    setChoosenMaterials,
    choosenMaterials,
  };
  const ProductCategoriesTagsProps = {
    category,
    tag,
    setSelectedCategories,
    categoriesList,
    selectedCategories,
    locale,
  };
  let addToCartHandler = () => {};
  let uploadProductHandler = async () => {
    try {
      let profitChoosenTypeName = "number";
      let commissionPercentage = false;
      if (profitChoosenType == percentage) {
        profitChoosenTypeName = "percentage";
        commissionPercentage = true;
      }

      let data = {
        name: formValues.ProductName,
        vendor_commission: commissionVal,
        metadata_description: metadataDesc,
        metadata_title: metadataTitle,
        description: descriptionField,
        profitChoosenTypeName,
        commissionPercentage,
        showDiscountPrice,
      };
      const res = await axiosInstance.patch(
        `aliexpress/product/updateProduct/${product._id}`,
        data
      );
      if (res.status >= 200 && res.status < 300) {
        console.log("Product updated");
      } else {
        console.log("error");
      }
    } catch (e: any) {
      console.error(e);
    }
  };
  const formSubmmitedHandler = () => {
    buttonRef?.current?.click();
  };
  const ProductEditHeaderProps = {
    uploadProduct,
    addToCart,
    addToCartHandler,
    uploadProductHandler: formSubmmitedHandler,
  };
  return (
    <>
      <ProductEditHeader {...ProductEditHeaderProps} />
      <div className="bg-white rounded-lg shadow container tab:p-6 lap:flex min-w-full justify-between  ">
        <ProductImageRenderer product={product} />
        <div className="flex flex-col min-w-[55%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="flex flex-col bg-[#F7F5F2] rounded-lg shadow-lg tab:p-8 space-y-4  "
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <button type="submit" ref={buttonRef} className="hidden">
                Submit
              </button>
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
                <div className="grid grid-rows-3 grid-cols-1 tab:grid-cols-2  tab:gap-4   my-4 min-w-full">
                  <span className="tab:col-span-2">{originalPrice}</span>
                  <Input
                    className={`shadow-sm text-sm md:text-base bg-[#edf5f9] ${inputClasses} `}
                    value={product?.target_original_price}
                  />{" "}
                  <RadioGroup
                    defaultValue="shippingIncluded"
                    className="!flex flex-col tab:flex-row  tab:space-s-3 w-full"
                  >
                    <div className="flex items-center space-x-2  bg-[#edf5f9] p-2 rounded-md">
                      <RadioGroupItem value="withoutShipping" id="r1" />
                      <Label
                        className="whitespace-nowrap  text-xs mm:text-sm ml:text-md tab:text-lg"
                        htmlFor="r1"
                      >
                        {withoutShipping}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
                      <RadioGroupItem value="shippingIncluded" id="r2" />
                      <Label
                        className="whitespace-nowrap text-xs mm:text-sm ml:text-md tab:text-lg"
                        htmlFor="r2"
                      >
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
                        className="inputField px-6"
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
                  </div>
                </div>
                <ProductPriceDetails {...ProductPriceDetailsProps} />

                <Separator />

                <ProductCategoriesTags {...ProductCategoriesTagsProps} />

                <Separator />
                <ProductSEOInfo {...ProductSEOInfoProps} />

                <ProductOptions {...ProductOptionsProps} />
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <Editor
                    value={descriptionField}
                    onChange={(value) => setDescriptionField(value)}
                  />

                  {/*   {errors?.description ? (
                  <span className="form-error">{errors?.description}</span>
                ) : null} */}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

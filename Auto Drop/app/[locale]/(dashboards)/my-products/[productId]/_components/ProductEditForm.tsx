"use client";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import useProductEditHeader from "./useProductEditHeader";
import MotionWrapperExit from "../../../_components/shared/MotionWrapperExit";
import { useLocale } from "next-intl";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Radio, RadioGroup, Spinner, useToast } from "@chakra-ui/react";

import ReactQuill from "react-quill";
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
import useProductOptions from "./ui/useProductOptions";
import ProductImageRenderer from "./ui/ProductImageRenderer";
import ProductCategoriesTags from "./ui/ProductCategoriesTags";

import { cn } from "@/lib/utils";
import ProductInfoDetails from "./ui/ProductInfoDetails";
import ProductDetails from "./ui/ProductDetails";
import ProductPriceDetails from "./ui/ProductPriceDetails";
import ProductSEOInfo from "./ui/ProductSEOInfo";
import Editor from "./ui/Editor";
import useLoader from "@/components/loader/useLoader";
import CurrencyFormatter from "../../../products/_components/CurrencyFormatter";
import useOptionHook from "./hooks/useOptionHook";
import useProductShipping from "./ui/useProductShipping";

import { useSelector } from "react-redux";
import { useErrorToast } from "../../../../../../components/chakra-ui/useErrorToast";
import { useSuccessToast } from "../../../../../../components/chakra-ui/useSuccessToast";

import { Shipping } from "./types/shipping.interfaces";
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
  currentPiece: string;
  SEOTitle: string;
  SEODescription: string;
  color: string;
  addOfferPrice: string;
  offerPrice: string;
  addToCart: string;
  uploadProduct: string;
  productOptionsDetails: string;
  withText: string;
  valueText: string;
}
interface CategorySalla {
  id: number;
  name: string;
}
export default function ProductEditForm(props: ProductEditFormProps) {
  const locale = useLocale();

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
    nameOfShippingComp,
    durationToDeliver,
    productOptionsDetails,
    withText,
    valueText,
  } = props;
  let sale_price = Number(product?.variantsArr?.[0]?.offer_sale_price)
let sku_price = Number(product?.variantsArr?.[0]?.sku_price)
  const errorButtonRefShipping: React.RefObject<HTMLButtonElement> =
    useRef(null);
  const toast = useToast();
  const { ErrorComponent: ErrorComponentShipping } = useErrorToast({
    title: "Error while linking this product.",
    description: "Shipping is not available for this product.",
    errorButtonRef: errorButtonRefShipping,
  });
  const updateProductRef = useRef<HTMLButtonElement>(null);
  const { SuccessComponent: SuccessUpdateProductCompononet } = useSuccessToast({
    title: "Success.",
    description: "Product has been updated successfully.",
    successButtonRef: updateProductRef,
  });

  const formRefsArray = [
    "prodName",
    "SEOTitleText",
    "SEODescription",
    "description",
    "commission",
  ];

  interface Accumlator {
    [key: string]:
      | React.RefObject<HTMLInputElement>
      | React.RefObject<ReactQuill>;
  }
  /* const formRefs = formRefsArray.reduce((accumlator:Accumlator,currentValue:string)=>{
  if(currentValue =="description"){
    accumlator[currentValue] = useRef<ReactQuill>(null)
    return accumlator
  }
  accumlator[currentValue] = useRef<HTMLInputElement>(null)
   return accumlator
},{}) */
  let formRefs: any = {};
  formRefs.prodName = useRef<HTMLInputElement>(null);
  formRefs.SEODescription = useRef<HTMLInputElement>(null);
  formRefs.SEOTitleText = useRef<HTMLInputElement>(null);
  // formRefs.description = useRef<any>(null);
  formRefs.commission = useRef<HTMLInputElement>(null);

  const [discountPrice, setDiscountPrice] = useState(
    sku_price
  );
  const [categoriesList, setCategoriesList] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productShipping, setProductShipping] = useState([]);

  const [currentlySelectedVariant, setCurrentlySelectedVariant] = useState({});
  const [optionChoosenValues, setOptionChoosenValues] = useState([]);
  const sallaToken = useSelector((state: any) => state.user.sallaToken);
  const [tagsList, setTagsList] = useState([]);
  const [shippingWithoutOrInclude, setShippingWithoutOrInclude] =
    useState("shippingIncluded");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { setLoading, LoaderComponent } = useLoader();
  const [formValues, setFormValues] = useState<any>({ ProductName: "" });
  const [metadataTitle, setMetadataTitle] = useState("");
  const [metadataDesc, setMetadataDesc] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [profitChoosenType, setProfitChoosenType] = useState("percentage");
  const [descriptionField, setDescriptionField] = useState(
    product?.description
  );

  const [showDiscountPrice, setShowDiscountPrice] = useState<boolean>(false);
  const formSubmmitedHandler = () => {
    buttonRef?.current?.click();
  };
  const {
    optionsSelected,
    setOptionsSelected,
    optionCheckHandler,
    checkboxesSelected,
    checkboxHandler,
  } = useOptionHook({ product: product });
  let ProductShippingProps = {
    shippingText: shipping,
    nameOfShippingComp,
    durationToDeliver,
    shippingWithoutOrInclude,
    to,
    locale,
    product_id: product?.original_product_id,
    setProductShipping,
    shipping: productShipping,country_code:product?.country_code
  };
  const {
    ProductShippingComponent,
    value: choosenShippingIndex,
    shippingTotalCost,
    choosenCountryCode,setChoosenCountryCode
  } = useProductShipping({ ...ProductShippingProps });
  let addToCartHandler = () => {};
  const ProductEditHeaderProps = {
    uploadProduct,
    addToCart,
    addToCartHandler,
    uploadProductHandler: formSubmmitedHandler,
  };
  const { ProductHeaderComponent, choosenCartQuantity, setQuantity } =
    useProductEditHeader({
      ...ProductEditHeaderProps,
    });
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
  const [variantsDetails, setVariantsDetails] = useState(
    Array(product?.variantsArr.length).fill({
      price: 0,
      originalPrice: 0,
      quantity: 0,
    })
  );
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
      setCommissionVal(product?.vendor_commission);
      const newValues: any = {
        prodName: product?.name,
        SEOTitleText: metadata_title,
        SEODescription: metadata_description,
      };
if(product?.shippingIncludedChoice==true) {

  setShippingWithoutOrInclude("shippingIncluded")
}else if(product?.shippingIncludedChoice==false){ 
  setShippingWithoutOrInclude("withoutShipping")
}
      // Use the setValue method to update the form fields
      Object.keys(newValues).forEach((key: any) => {
        form.setValue(key, newValues[key]);
      });

      setFormValues((prevV: any) => {
        return { ...prevV, ProductName: product?.name };
      });
      if (formRefs.prodName.current) {
        formRefs.prodName.current.value = product?.name;
      }
/*       if (formRefs.description?.current) {
        formRefs.description.current.value = product?.description;
      } */
      if (product?.discountPrice == 0) {
        setDiscountPrice(sku_price);
      } else {
        setDiscountPrice(product?.discountPrice);
      }

      setDescriptionField(product?.description);

      setShowDiscountPrice(product?.showDiscountPrice || false);
      setSelectedTags(
        product?.sallaTags.map((tag: { name: string; id: number }) => tag.name)
      );
      let initialChoosenValues = product?.options
        ?.map((option: any) => option.values)
        .map((values: any, optionIndex: number) => {
          return {
            name: values[0].name,
            property_id: values[0].property_id,
            optionIndex,
            valueIndex: "0",
          };
        });
      setOptionChoosenValues(initialChoosenValues);

      if (!product?.commissionPercentage) {
        setProfitChoosenType("number");
      }

      let updatedVariantsArr = product.variantsArr.map((variant: any) => {
        let { commission, profitTypeValue, shippingChoice, require_shipping } =
          variant;
        if (!variant?.shippingChoice) {
          shippingChoice = "shippingIncluded";
        }
        if (!variant?.profitTypeValue) {
          profitTypeValue = "percentage";
        }
        if (!variant?.commission) {
          commission = 0;
        }
        if (!variant?.require_shipping) {
          require_shipping = false;
        }
        return {
          ...variant,
          shippingChoice,
          profitTypeValue,
          commission,
          require_shipping,
        };
      });

      // filter variants and remove ships from relativeOptions
  /*     if (
        updatedVariantsArr?.[0]?.relativeOptions?.some(
          (option: any) => option.sku_property_name === "Ships From"
        )
      ) {
        // remove ships from variants
        let variantsIdsToKeep: number[] = [];
        let variantsIdentifiers: string[] = [];
        updatedVariantsArr.forEach((variant: any, index: number) => {
          let { relativeOptions } = variant;
          relativeOptions = relativeOptions.filter(
            (element: any, index: number) =>
              element.sku_property_name !== "Ships From"
          );

          let variantIdentifier = relativeOptions
            .map(
              (element: any, index: number) =>
                `${element.sku_property_id}:${element.property_value_id}`
            )
            .join("-");
          if (!variantsIdentifiers.includes(variantIdentifier)) {
            variantsIdentifiers.push(variantIdentifier);
            variantsIdsToKeep.push(index);
          }
        });
        console.log("variantsIdsToKeep", variantsIdsToKeep);
        console.log("variantsIdsToKeep.length", variantsIdsToKeep.length);
        const newVariantsWithoutShipsFrom = updatedVariantsArr.filter((variant:any,index:number)=>{
       return variantsIdsToKeep.includes(index)
        }).map((variant:any)=>{
let {relativeOptions} = variant
relativeOptions = relativeOptions.filter((rO:any)=>{
  return rO.sku_property_name !=="Ships From"
})
return {...variant,relativeOptions}
        })
        console.log("newVariantsWithoutShipsFrom",newVariantsWithoutShipsFrom)
      } */
      setVariantsDetails(updatedVariantsArr);
      setCurrentlySelectedVariant(product?.variantsArr[0]);
      setProductOptions(product.options);
      setProductImages(product.images);
      setChoosenCountryCode(product?.country_code)
      setProductShipping(product?.shipping);
    }
  }, [product]);
  const [commissionVal, setCommissionVal] = useState(
    product?.vendor_commission || 0
  );

  const [totalProfit, setTotalProfit] = useState(
    (product?.vendor_commission || 0) * sale_price
  );
  const [finalPrice, setFinalPrice] = useState(
    (product?.vendor_commission || 0) * sale_price +
      sale_price
  );
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await axiosInstance.get("/salla/categories");
        // console.log(resp.data);
        if (resp.status < 300 && resp.status >= 200) {
          setCategoriesList(resp.data.data);
        }
        console.log("resp.data.data", resp.data.data);
      } catch (err: any) {
        console.log(err?.response.data);
        console.log(err?.response.status);
        console.log(err?.response.headers);
      }
    };
    const fetchTags = async () => {
      try {
        const resp = await axiosInstance.get("/salla/tags");
        // console.log(resp.data);
        if (resp.status < 300 && resp.status >= 200) {
          setTagsList(resp.data.data);
        }
      } catch (err: any) {
        console.log(err?.response.data);
        console.log(err?.response.status);
        console.log(err?.response.headers);
      }
    };
    fetchCategories();
    // fetchTags();
  }, []);
  useEffect(() => {
    console.log("product", product);
    /*     console.log(
      "product?.categoriesSalla && product?.categoriesSalla.length!==0",
      product?.categoriesSalla && product?.categoriesSalla.length !== 0
    ); */
    // console.log("categoriesList", categoriesList);
    if (product?.categoriesSalla && product?.categoriesSalla.length !== 0) {
      let fetchedCat = categoriesList
        .filter((category: any) =>
          product?.categoriesSalla.includes(category.id)
        )
        .map((category: any) => category.name);
      setSelectedCategories(fetchedCat);
    }
    /*   if (product?.tagsSalla && product?.tagsSalla.length !== 0) {
      let fetchedTags = tagsList
        .filter((tag: any) => product?.tagsSalla.includes(tag.id))
        .map((tag: any) => tag.name);
      setSelectedTags(fetchedTags);
    } */
    // console.log("tagsList", tagsList);
    // setSelectedTags(tagsList.map((t: any) => t.name));
  }, [categoriesList]);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (profitChoosenType == "percentage" || profitChoosenType == percentage) {
      setFinalPrice((finalPrice: any) => {
        return (
          (commissionVal / 100) * sale_price +
          sale_price
        );
      });
      setTotalProfit((prevTotalProfit: any) => {
        return (commissionVal / 100) * sale_price;
      });
    } else {
      setFinalPrice((finalPrice: any) => {
        return commissionVal + sale_price;
      });
      setTotalProfit((prevTotalProfit: any) => {
        return commissionVal;
      });
    }
  }, [totalProfit, profitChoosenType, commissionVal]);
  let inputClasses = `bg-[#edf5f9] text-[#253439] rounded-lg shadow`;
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
    if (!sallaToken || sallaToken == "") {
      /*     toast({
        variant: "destructive",
        title: "Please link your account with salla and try again.",
      }); */
      toast({
        status: "error",
        title: "Error",
        description: "Please Link your account with salla and try again.",
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    if (productShipping?.length == 0) {
      errorButtonRefShipping?.current?.click();
      return;
    }
    //@ts-ignore
    if(productOptions?.[0]?.name !== undefined){
      
          let valueNumber = 0
          let count = 1 

      productOptions?.forEach((option:any)=>{
        let {values} = option
        if(values?.length == 0){
          return
        }
        count = count * values?.length
      })
      if(count!==1 ){
        valueNumber=count
      }
      console.log("valueNumber",valueNumber)
      if(valueNumber >100){
        toast({
          status: "error",
          title: "Error",
          description: "Maximum number of variants in Salla is 100 please delete some options and try again.",
          duration: 9000,
          isClosable: true,
        });
        return
      }
    }
    setLoading(true);

    // setIsLoading(true);
    try {
      uploadProductHandler(data);
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      // setIsLoading(false);
      setLoading(false);
    }
  };
  const ProductOptionsProps = {
    options: productOptions,
    optionsSelected,
    setOptionsSelected,
    optionCheckHandler,
    checkboxesSelected,
    checkboxHandler,
    setOptionChoosenValues,
    optionChoosenValues,
    setProductOptions,
    setVariantsDetails,setProductImages
  };
  const { ProductOptionsComponent } = useProductOptions({
    ...ProductOptionsProps,
  });
  if (!product) {
    return (
      <div className="flex space-s-3 items-center text-green-500">
        <Spinner />
        <div className="dark:text-white">Fetching Product...</div>
      </div>
    );
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
    shippingTotalCost,
    setDiscountPrice,
    discountPrice,shippingWithoutOrInclude,choosenShippingIndex,shipping:productShipping
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

  const ProductCategoriesTagsProps = {
    category,
    tag,
    setSelectedCategories,
    categoriesList,
    selectedCategories,
    locale,
    tagsList,
    setSelectedTags,
    selectedTags,
  };

  let ProductImageProps = {
    setProductImages,
    productImages,
  };
  let ProductDetailsProps = {
    productOptionsDetails,
    currentPiece,
    availableQuantity,
    productQuantity: product?.quantity,
    tagetSalePrice: sale_price,
    inputClasses,
    shippingIncluded,
    withoutShipping,
    originalPrice,
    withText,
    // shippingChoosenValue: shippingWithoutOrInclude,
    variantsDetails,
    profitType,
    percentage,
    number,
    valueText,
    optionChoosenValues,
    setCurrentlySelectedVariant,
    currentlySelectedVariant,
    finalPriceText: editedPrice,
    profitText: profit,
    setVariantsDetails,
    shippingTotalCost,
    productOptions,shippingWithoutOrInclude,shipping:productShipping,choosenShippingIndex,baseCommission:commissionVal
  };
  let SelectComponent = (
    <Select
      onValueChange={(value: any) => {
        setProfitChoosenType(value);
      }}
      defaultValue="percentage"
    >
      <SelectTrigger className="bg-[#edf5f9] dark:text-black">
        <SelectValue
          className=" dark:text-[#253439]"
          placeholder={percentage}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="number">{number}</SelectItem>
          <SelectItem value="percentage">{percentage}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
  if (product && !product?.commissionPercentage) {
    SelectComponent = (
      <Select
        onValueChange={(value: any) => {
          setProfitChoosenType(value);
        }}
        defaultValue="number"
      >
        <SelectTrigger className="bg-[#edf5f9] dark:text-black">
          <SelectValue
            className=" dark:text-[#253439]"
            placeholder={percentage}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="number">{number}</SelectItem>
            <SelectItem value="percentage">{percentage}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  let uploadProductHandler = async (dataForm: any) => {
    try {
      let profitChoosenTypeName = "number";

      let commissionPercentage = false;
      if (
        profitChoosenType == percentage ||
        profitChoosenType == "percentage"
      ) {
        profitChoosenTypeName = "percentage";
        commissionPercentage = true;
      }

      let require_shipping;
      let shippingIncludedChoice;
      if (shippingWithoutOrInclude == "shippingIncluded") {
        require_shipping = false;
        shippingIncludedChoice = true;
      } else {
        require_shipping = true;
        shippingIncludedChoice = false;
      }

      let categoriesSalla = categoriesList
        .filter((category: CategorySalla) =>
          selectedCategories.includes(category.name)
        )
        .map((category: CategorySalla) => category.id);

      let data: any = {
        name: dataForm.prodName,
        vendor_commission: commissionVal,
        metadata_description: dataForm?.SEODescription,
        metadata_title: dataForm?.SEOTitleText,
        profitChoosenTypeName,
        commissionPercentage,
        showDiscountPrice,
        require_shipping,
        categoriesSalla,
        selectedTags,
        checkboxesSelected,
        choosenShippingIndex,
        shippingIncludedChoice,
        discountPrice,
        options: productOptions,
        variantsArr: variantsDetails,
        images: productImages,
        shipping: productShipping,description:descriptionField
      };
/*       if (formRefs.description?.current) {
        data.description = formRefs.description.current.value;
      } */
      /*     if(formRefs.discountPrice.current){
        data.discountPrice = formRefs.discountPrice.current.value
      } */

      if (choosenCountryCode) {
        data.country_code = choosenCountryCode;
      }
      if (shippingWithoutOrInclude == "shippingIncluded") {
        data.shippingIncludedChoiceIndex = choosenShippingIndex;
      } else {
        data.shippingIncludedChoiceIndex = -1;
      }
      const resPromise = axiosInstance.patch(
        `aliexpress/product/updateProduct/${product._id}`,
        data
      );
      toast.promise(resPromise, {
        success: {
          title: `Success`,
          description: `${product?.name} has been added successfully`,
        },
        error: {
          title: "Fail",
          description: "Something went wrong while updating product",
        },
        loading: {
          title: "Updating Product",
          description: "Please wait",
          position: "bottom-right",
        },
      });
      const res = await resPromise;
      if (res?.data?.message == "SallaToken Not Found.") {
        // toast({variant:"destructive",description:"SallaToken Not Found."})
        toast({
          status: "error",
          title: "Error",
          description: "Please Link your account with salla and try again.",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      if (res.status >= 200 && res.status < 300) {
        console.log("Product updated");
        // updateProductRef?.current?.click()
      } else {
        console.log("error");
      }
    } catch (e: any) {
      if (e?.response?.data?.message == "SallaToken Not Found.") {
        // toast({variant:"destructive",description:"Please Link your account with salla and try again."})
        toast({
          status: "error",
          title: "Error",
          description: "Please Link your account with salla and try again.",
          duration: 9000,
          isClosable: true,
        });
      }

      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {SuccessUpdateProductCompononet}
      {ErrorComponentShipping}
      {LoaderComponent}
      {ProductHeaderComponent}
      <div className="bg-white rounded-lg shadow container tab:p-6 lap:flex min-w-full justify-between  dark:bg-[#2e464f] dark:text-white">
        <div className=" lap:max-w-[35%] min-w-[31%]">
          <ProductImageRenderer {...ProductImageProps} />
          <ProductDetails {...ProductDetailsProps} />
        </div>
        <div className="flex flex-col min-w-[55%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="flex flex-col rounded-lg tab:p-3 space-y-4  "
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
                <div className="grid grid-cols-1 tab:grid-cols-2  tab:gap-4   my-4 min-w-full">
                  <span className="tab:col-span-2">{originalPrice}</span>
                  <Input
                    className={`shadow-sm text-sm md:text-base bg-[#edf5f9] ${inputClasses} `}
                    value={CurrencyFormatter(sale_price)}
                  />{" "}
                  <RadioGroup
                    // defaultValue="shippingIncluded"
                    className="grid grid-cols-1 ml:grid-cols-2 gap-2 tab:my-0 my-2 ml:my-3 w-full"
                    /*               onValueChange={(value: string) => {
                      setShippingWithoutOrInclude(value);
                    }} */
                    onChange={(value: string) => {
                      setShippingWithoutOrInclude(value);
                    }}
                    value={shippingWithoutOrInclude}
                  >
                    <div className="flex items-center space-x-2  bg-[#edf5f9] p-2 rounded-md">
                      <Radio value="withoutShipping">
                        <div
                          className=" text-xs dark:text-black whitespace-nowrap"
                          // htmlFor="r11"
                        >
                          {withoutShipping}
                        </div>
                      </Radio>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#edf5f9] p-2 rounded-md">
                      <Radio value="shippingIncluded">
                        <div
                          className="text-xs  dark:text-black whitespace-nowrap"
                          // htmlFor="r22"
                        >
                          {shippingIncluded}
                        </div>
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4  my-4 min-w-full">
                  <span className="col-span-2">{profitType}</span>
                  {SelectComponent}
                  <div className=" flex items-center space-s-3 ">
                    <div className="relative mt-auto min-w-full">
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

                {ProductOptionsComponent}
                {shippingWithoutOrInclude == "shippingIncluded" &&
                  ProductShippingComponent}

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <Editor
                    value={descriptionField}
                    onChange={(value) => setDescriptionField(value)}
         /*            //@ts-ignore
                    ref={formRefs.description} */
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

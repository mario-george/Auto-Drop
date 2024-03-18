import { ProductSchema } from "../../../../../models/product.model";
import { UpdateProductVariant, UpdateProductVariantSale } from "../CRUD";

interface VariantsPatcherProps {
  product: ProductSchema;
  totalPages: number;
  beginIndex: number;
  perPage: number;
  token: string;
  currentPage: number;
  variantsResponse: any;
}
function getRandomInt(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
export default async function VariantsPatcher({
  product,
  totalPages,
  beginIndex,
  perPage,
  token,
  variantsResponse,currentPage
}: VariantsPatcherProps) {
    console.log("reached variants patcher")
  const variants = variantsResponse?.data?.filter((e: any) => !e.sku);
  if (!variants) {
    console.log("No variants");
  }
  let variantsIds = variants.map((el: any) => {
    return el.id;
  });
  console.log("variantsIds", variantsIds);
  let {
    variantsArr,
    showDiscountPrice,
    commissionPercentage,
    vendor_commission,
    shipping,
  } = product;
  let variantsAccordingToPages = variantsArr;
  if (totalPages > 1) {

    if(currentPage * perPage > variantsArr.length){
        variantsAccordingToPages = variantsArr.slice(beginIndex );

    }else{

        variantsAccordingToPages = variantsArr.slice(beginIndex, perPage );
    }
  }
  console.log("variantsAccordingToPages.length", variantsAccordingToPages.length);
  let promises = variantsAccordingToPages.map((el: any, index: number) => {
    let variantId = variantsIds[index];
    let {
      offer_sale_price: priceString,
      sku_available_stock: quantity,
      sku_id,
      sku_price: oldPrice,
      shippingChoice,
      commission,
      profitTypeValue,
    } = el satisfies { commission: number };

    let price = parseFloat(priceString);
    console.log("quantity", quantity);
    if (commission != 0 && commission > 0) {
      if (profitTypeValue == "number") {
        price = price + commission;
      } else if (profitTypeValue == "percentage") {
        price = (commission / 100) * price + price;
      }
    } else {
      if (vendor_commission && !commissionPercentage) {
        price = price + vendor_commission;
      } else if (vendor_commission && commissionPercentage) {
        price = (vendor_commission / 100) * price + price;
      }
    }

    if (
      //@ts-ignore
      shipping?.length != 0 &&
      shippingChoice == "shippingIncluded"
    ) {
      let shippingIncludedChoiceIndex = 0;
      if (product?.shippingIncludedChoice) {
        shippingIncludedChoiceIndex = product?.shippingIncludedChoiceIndex || 0;
      }
      //@ts-ignore

      let extraShippingCost =
        //@ts-ignore
        shipping?.[shippingIncludedChoiceIndex]?.freight?.cent / 100;
      console.log("extraShippingCost", extraShippingCost);
      price += extraShippingCost;
      console.log("price", price);
    }
    let mnp = getRandomInt(100000000000000, 999999999999999);
    let gitin = getRandomInt(10000000000000, 99999999999999);
    let barcode = [mnp, gitin].join("");
    // add condition for sale enabling in product
    if (oldPrice && showDiscountPrice) {
      return UpdateProductVariantSale(
        variantId,
        barcode,
        oldPrice,
        quantity,
        mnp,
        gitin,
        sku_id,
        token,
        price
      );
    }
    return UpdateProductVariant(
      variantId,
      barcode,
      price,
      quantity,
      mnp,
      gitin,
      sku_id,
      token
    );
  });
  let results = await Promise.allSettled(promises);
  let errorArrayVariants: any = [];

  await Promise.allSettled(results.map((result: any, index: number) => {
    if (result?.status == "rejected") {
      errorArrayVariants.push({ result, index });
      console.log("A VARIANT IS UNDEFINED");
    }
    console.log(result?.value?.data);
  }))
  console.log("errorArrayVariants", errorArrayVariants);
  return errorArrayVariants;
}

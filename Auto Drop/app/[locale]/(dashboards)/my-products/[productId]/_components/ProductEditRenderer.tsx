"use client";
import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../_components/shared/AxiosInstance";
import MotionWrapperExit from "../../../_components/shared/MotionWrapperExit";
import ProductEditForm from "./ProductEditForm";
import Image from "next/image";
export default function ProductEditRenderer(props: {
  children?: React.ReactNode;
  params: { productId: string };
  locale: string;
  productOptionsDetails:string
  prodNameTitle: string;
  prodNameTitlePlaceholder: string;
  sku: string;
  shipping: string;
  description: string;
  to: string;
  with: string;
  size: string;
  price: string;
  invalidProdName: string;
  invalidSEODescription: string;
  invalidSEOTitle: string;
  invalidDescription: string;
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
  valueText: string;
  currentPiece: string;
  SEOTitle: string;
  SEODescription: string;
  color: string;
  availableQuantity: string;
  offerPrice: string;
  addOfferPrice: string;
  uploadProduct: string;
  addToCart: string;
  withText: string;
}) {
  let { locale, children } = props;
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/aliexpress/product/getProductInfo/${props.params.productId}`
        );
        console.log(response);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(true);
      }
    };

    fetchData();
  }, [props.params.productId]);
  if (error) {
    return <div>No Product found with this id</div>;
  }

  return (
    <div>
      <MotionWrapperExit locale={locale} mdClasses=" my-3">
        <div className="productEditContainer">
          <ProductEditForm {...props} product={product} />
        </div>
      </MotionWrapperExit>
    </div>
  );
}

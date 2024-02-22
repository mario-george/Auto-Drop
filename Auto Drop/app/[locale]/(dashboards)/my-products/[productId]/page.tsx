"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../_components/shared/AxiosInstance";
import ProductEditHeader from "./_components/ProductEditHeader";
import MotionWrapperExit from "../../_components/shared/MotionWrapperExit";
import { useLocale } from "next-intl";

export default function ProductEdit(props: { params: { productId: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState(false);
  const locale = useLocale();
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
  console.log(product);
  return (
    <>
      <MotionWrapperExit locale={locale}>
        <ProductEditHeader />
        <div>{JSON.stringify(product)}</div>
        <div>
          Product Id is
          {props.params.productId}
        </div>
      </MotionWrapperExit>
    </>
  );
}

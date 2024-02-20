import { useRouter, useSearchParams } from "next/navigation";
export default function ProductEdit() {
  const router = useRouter();

  const params = useSearchParams();

  const productId = params.get("productId");

  return <></>;
}

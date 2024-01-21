"use client";

import { useSelector } from "react-redux";
import { useRouter } from "@/navigation";
import { RootState } from "@/store";

export default function DashboardProtectWrapper({
  children,
}: {
  children: any;
}) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return router.push("/login");
  }

  return children;
}

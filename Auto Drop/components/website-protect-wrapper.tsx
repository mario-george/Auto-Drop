"use client";

import { useSelector } from "react-redux";
import { useRouter } from "@/navigation";
import React, { useEffect } from "react";
import { RootState } from "@/store";

export default function WebsiteProtectWrapper({ children }: { children: any }) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return router.push("/");
  }

  return children;
}

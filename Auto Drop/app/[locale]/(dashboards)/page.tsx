"use client";

import { store } from "@/store";
import { Button } from "@/components/ui/button";
import { userActions } from "@/store/user-slice";
import SideNav from "@/components/layout/layout";
export default function Home() {
  return (
    <>
      <SideNav />
      <div className="text-center">Dahboard &ldquo;Protected&rdquo;</div>
      <Button
        onClick={() => store.dispatch(userActions.logout())}
        className="bg-slate-800 mx-auto block hover:bg-white hover:text-slate-800 hover:border hover:border-slate-800"
      >
        Logout
      </Button>
    </>
  );
}

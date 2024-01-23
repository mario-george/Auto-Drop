import SideNav from "@/app/[locale]/(dashboards)/_components/shared/SideNav";
import LogoutProtectWrapper from "./LogoutProtectWrapper";
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // dir={locale === "ar" ? "rtl" : "ltr"}
  return (
    <>
      <div className="">
        <SideNav />
        <LogoutProtectWrapper />
        {children}
      </div>
    </>
  );
}

import DashboardProtectWrapper from "@/components/dashboard-protect-wrapper";
import { useTranslations } from "next-intl";
import ClientHeader from "@/app/[locale]/(dashboards)/_components/shared/ClientHeader";
import SideNav from "@/app/[locale]/(dashboards)/_components/shared/SideNav";

export default function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations("ClientTopBar");

  return (
    <DashboardProtectWrapper>
      <div className="bg-[#F0F3F4] py-4" dir={locale === "ar" ? "rtl" : "ltr"}>
        <div className="flex space-s-3 " dir={locale === "ar" ? "rtl" : "ltr"}>
          <SideNav locale={locale} />
          <div className="flex flex-col flex-1 space-s-0 !my-0">
            <ClientHeader
              lang={t("lang")}
              planTitle={t("planTitle")}
              planValue={t("planValue")}
              locale={locale}
            />
            {children}
          </div>
        </div>
      </div>
    </DashboardProtectWrapper>
  );
}

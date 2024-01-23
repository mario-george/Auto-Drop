import DashboardProtectWrapper from "@/components/dashboard-protect-wrapper";
import { useTranslations } from "next-intl";
import ClientHeader from "@/app/[locale]/(dashboards)/_components/shared/ClientHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("ClientTopBar");

  return (
    <DashboardProtectWrapper>
      <div className="bg-[#F0F3F4] py-4">
        <ClientHeader lang={t("lang")} />

        {children}
      </div>
    </DashboardProtectWrapper>
  );
}

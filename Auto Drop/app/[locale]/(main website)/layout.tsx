import { useTranslations } from "next-intl";
import WebsiteHeader from "@/components/website-header";
import WebsiteProtectWrapper from "@/components/website-protect-wrapper";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("websiteHeader");

  return (
    <WebsiteProtectWrapper>
      <div className="bg-primary min-h-screen">
        <WebsiteHeader
          lang={t("lang")}
          login={t("login")}
          links={[t("link1"), t("link2"), t("link3"), t("link4"), t("link5")]}
        />
        {children}
      </div>
    </WebsiteProtectWrapper>
  );
}

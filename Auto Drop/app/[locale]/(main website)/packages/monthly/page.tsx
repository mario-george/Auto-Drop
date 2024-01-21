import { useLocale, useTranslations } from "next-intl";
import Monthly from "@/components/packages/Monthly";
import Footer from "@/components/home/footer";

export default function Package() {
  const t = useTranslations("packages");
  const tHome = useTranslations("home");
  const locale = useLocale();
  return (
    <>
      <Monthly
        locale={locale}
        packages={t("packages")}
        priceHeader={t("priceHeader")}
        monthlyHeader={t("monthlyHeader")}
        example3={t("example3")}
        note={t("note")}
        monthly={t("monthly")}
        free={t("free")}
        annual={t("annual")}
        PackagePro={t("Package Pro")}
        PackagePlus={t("Package Plus")}
        BasicPackage={t("Basic Package")}
        Difference={t("Difference")}
        Products={t("Products")}
        Orders={t("Orders")}
        subscribtion={t("subscribtion")}
        allowed={t("allowed")}
        SAR = {t("SAR")}
      />
      <Footer
        locale={locale}
        footer1={tHome("footer1")}
        footerLink1={tHome("footerLink1")}
        footerLink2={tHome("footerLink2")}
        footerLink3={tHome("footerLink3")}
        autoDrop={tHome("autoDrop")}
        contactUs={tHome("contactUs")}
        aboutUs={tHome("aboutUs")}
      />
    </>
  );
}

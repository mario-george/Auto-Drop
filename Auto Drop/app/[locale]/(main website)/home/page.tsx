import { useLocale, useTranslations } from "next-intl";
import FirstSection from "@/components/home/firstSection";
import SecondSection from "@/components/home/secondSection";
import ThirdSection from "@/components/home/thirdSection";
import FourthSection from "@/components/home/fourthSection";
import FifthSection from "@/components/home/fifthSection";
import SixthSection from "@/components/home/sixthSection";
import SeventhSection from "@/components/home/seventhSection";
import Footer from "@/components/home/footer";

export default function Package() {
  const t = useTranslations("home");
  const t2 = useTranslations("packages");
  const locale = useLocale();

  return (
    <div>
      <FirstSection
        locale={locale}
        header1={t("header1")}
        header2={t("header2")}
        subHeader={t("subHeader")}
        subHeader2={t("subHeader2")}
        startButton={t("startButton")}
      />
      <SecondSection
        locale={locale}
        how={t("how")}
        howDetails={t("howDetails")}
      />
      <ThirdSection
        locale={locale}
        featuresHeader={t("featuresHeader")}
        firstFeature={t("firstFeature")}
        firstDetails={t("firstDetails")}
        secondFeature={t("secondFeature")}
        secondDetails={t("secondDetails")}
        thirdFeature={t("thirdFeature")}
        thirdDetails={t("thirdDetails")}
        fourthFeature={t("fourthFeature")}
        fourthDetails={t("fourthDetails")}
      />
      <FourthSection
        locale={locale}
        serviceHeader={t("serviceHeader")}
        orders={t("orders")}
        products={t("products")}
        order1={t("order1")}
        order2={t("order2")}
        order3={t("order3")}
        products1={t("products1")}
        products2={t("products2")}
        products3={t("products3")}
        products4={t("products4")}
      />
      <FifthSection
        locale={locale}
        linkHeader={t("linkHeader")}
        subLink1={t("subLink1")}
        subLink2={t("subLink2")}
        linkButton={t("linkButton")}
        soon={t("soon")}
      />
      <SixthSection
        locale={locale}
        stepsHeader={t("stepsHeader")}
        step1={t("step1")}
        step2={t("step2")}
        step3={t("step3")}
        step4={t("step4")}
        step5={t("step5")}
      />
      <SeventhSection
        locale={locale}
        SAR = {t2("SAR")}
        packageHeader={t("packageHeader")}
        Package1={t("Package1")}
        Package2={t("Package2")}
        Package3={t("Package3")}
        Package4={t("Package4")}
        PackagePrice1={t("PackagePrice1")}
        PackagePrice2={t("PackagePrice2")}
        PackagePrice3={t("PackagePrice3")}
        PackagePrice4={t("PackagePrice4")}
        originalPrice1={t("originalPrice1")}
        originalPrice2={t("originalPrice2")}
        originalPrice3={t("originalPrice3")}
        PackageProducts1={t("PackageProducts1")}
        PackageProducts2={t("PackageProducts2")}
        PackageProducts3={t("PackageProducts3")}
        PackageOrders1={t("PackageOrders1")}
        PackageOrders2={t("PackageOrders2")}
        PackageOrders3={t("PackageOrders3")}
        subscribtion={t("subscribtion")}
        PackageProducts4={t("PackageProducts4")}
        PackageOrders4={t("PackageOrders4")}
        monthly={t("monthly")}
        free={t("free")}
        freeButton={t("freeButton")}
      />
      <Footer
        locale={locale}
        footer1={t("footer1")}
        footerLink1={t("footerLink1")}
        footerLink2={t("footerLink2")}
        footerLink3={t("footerLink3")}
        autoDrop={t("autoDrop")}
        contactUs={t("contactUs")}
        aboutUs={t("aboutUs")}
      />
    </div>
  );
}

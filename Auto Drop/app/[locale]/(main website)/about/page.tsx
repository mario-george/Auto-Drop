import { useTranslations, useLocale } from "next-intl";
import AboutComponents from "@/components/about-components";
import Footer from "@/components/home/footer";

export default function About() {
  const t = useTranslations("about");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <main className="container  pb-10" dir={locale === "ar" ? "rtl" : "ltr"}>
        <AboutComponents
          about={t("about")}
          aboutContent={t("aboutContent")}
          pros={t("pros")}
          firstBoxTitle={t("firstBoxTitle")}
          firstBoxContent={t("firstBoxContent")}
          secondBoxTitle={t("secondBoxTitle")}
          secondBoxContent={t("secondBoxContent")}
          thirdBoxTitle={t("thirdBoxTitle")}
          thirdBoxContent={t("thirdBoxContent")}
          fourthBoxTitle={t("fourthBoxTitle")}
          fourthBoxContent={t("fourthBoxContent")}
          fifthBoxTitle={t("fifthBoxTitle")}
          fifthBoxContent={t("fifthBoxContent")}
          sixthBoxTitle={t("sixthBoxTitle")}
          sixthBoxContent={t("sixthBoxContent")}
          goal={t("goal")}
          goalContent={t("goalContent")}
          locale={locale}
        />
      </main>
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

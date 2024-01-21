import { useTranslations, useLocale } from "next-intl";
import Accordings from "@/components/accordings";
import Footer from "@/components/home/footer";

export default function FAQ() {
  const t = useTranslations("faq");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <main className="container pb-14" dir={locale === "ar" ? "rtl" : "ltr"}>
        <Accordings
          firstAccordingTitle={t("firstAccordingTitle")}
          secondAccordingTitle={t("secondAccordingTitle")}
          thirdAccordingTitle={t("thirdAccordingTitle")}
          fourthAccordingTitle={t("fourthAccordingTitle")}
          firstAccordingContent={t("firstAccordingContent")}
          secondAccordingContent={t("secondAccordingContent")}
          thirdAccordingContent={t("thirdAccordingContent")}
          fourthAccordingContent={t("fourthAccordingContent")}
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

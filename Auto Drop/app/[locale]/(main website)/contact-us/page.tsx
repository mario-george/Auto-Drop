import { useLocale, useTranslations } from "next-intl";
import ContactForm from "@/components/contact-form";
import InquirySection from "@/components/inquiry-secrion";
import Footer from "@/components/home/footer";

export default function ContactUs() {
  const t = useTranslations("contactUs");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <main
        className="container flex lg:flex-row gap-y-5 flex-col-reverse pb-14"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <ContactForm
          locale={locale}
          classes="basis-1/2"
          name={t("name")}
          email={t("email")}
          phone={t("phone")}
          message={t("message")}
          namePlaceholder={t("namePlaceholder")}
          phonePlaceholder={t("phonePlaceholder")}
          messagePlaceholder={t("messagePlaceholder")}
          emailPlaceholder={t("emailPlaceholder")}
          send={t("send")}
          invalidEmail={t("invalidEmail")}
          invalidMessage={t("invalidMessage")}
          invalidName={t("invalidName")}
          invalidPhone={t("invalidPhone")}
        />
        <InquirySection
          classes="basis-1/2"
          locale={locale}
          inquiry1={t("inquiry1")}
          inquiry2={t("inquiry2")}
          address={t("address")}
          addressContent={t("addressContent")}
          mail={t("mail")}
          whats={t("whats")}
          telegram={t("telegram")}
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

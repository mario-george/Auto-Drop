import { useTranslations, useLocale } from "next-intl";
import ForgetPasswordForm from "./_components/forget-password-form";
import Footer from "@/components/home/footer";

export default function ForgetPassword() {
  const t = useTranslations("forgetPassword");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <main
        className="container flex lg:flex-row gap-y-5 flex-col-reverse pb-14"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <ForgetPasswordForm
          email={t("email")}
          locale={locale}
          emailPlaceholder={t("emailPlaceholder")}
          invalidEmail={t("invalidEmail")}
          tip={t("tip")}
          send={t("send")}
          toastMessage={t("toastMessage")}
          back={t("back")}
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

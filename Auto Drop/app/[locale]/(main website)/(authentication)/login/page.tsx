import { useLocale, useTranslations } from "next-intl";
import LoginForm from "../_components/login-form";
import WelcomeSection from "../_components/welcome-section";
import Footer from "@/components/home/footer";

export default function Login() {
  const t = useTranslations("loginForm");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <main
        className="container flex lg:flex-row gap-y-5 flex-col-reverse pb-14"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <LoginForm
          email={t("email")}
          password={t("password")}
          login={t("login")}
          forgetPassword={t("forgetPassword")}
          dontHaveAccount={t("dontHaveAccount")}
          signup={t("signup")}
          or={t("or")}
          emailPlaceholder={t("emailPlaceholder")}
          passwordPlaceholder={t("passwordPlaceholder")}
          invalidEmail={t("invalidEmail")}
          invalidPassword={t("invalidPassword")}
          locale={locale}
          classes="basis-1/2"
        />
        <WelcomeSection
          text={t("welcome")}
          classes="basis-1/2"
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

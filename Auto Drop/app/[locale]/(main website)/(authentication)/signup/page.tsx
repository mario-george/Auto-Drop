import { useLocale, useTranslations } from "next-intl";
import SignupForm from "../_components/signup-form";
import WelcomeSection from "../_components/welcome-section";
import Footer from "@/components/home/footer";

export default function Signup() {
  const t = useTranslations("signupForm");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <main
        className="container flex lg:flex-row gap-y-5 flex-col-reverse pb-14"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <SignupForm
          fName={t("fName")}
          lName={t("lName")}
          email={t("email")}
          password={t("password")}
          confirmPassword={t("confirmPassword")}
          signup={t("signup")}
          alreadyHaveAccount={t("alreadyHaveAccount")}
          login={t("login")}
          or={t("or")}
          fNamePlaceholder={t("fNamePlaceholder")}
          lNamePlaceholder={t("lNamePlaceholder")}
          emailPlaceholder={t("emailPlaceholder")}
          passwordPlaceholder={t("passwordPlaceholder")}
          confirmPasswordPlaceholder={t("confirmPasswordPlaceholder")}
          passwordNotMatch={t("passwordNotMatch")}
          invalidEmail={t("invalidEmail")}
          invalidPassword={t("invalidPassword")}
          invalidFName={t("invalidFName")}
          invalidLName={t("invalidLName")}
          phone={t("phone")}
          phonePlaceholder={t("phonePlaceholder")}
          invalidPhone={t("invalidPhone")}
          
          code={t("code")}
          codePlaceholder={t("codePlaceholder")}
          confirm={t("confirm")}
          
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

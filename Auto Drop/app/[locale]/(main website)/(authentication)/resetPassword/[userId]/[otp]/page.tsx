import { useTranslations, useLocale } from "next-intl";
import ResetPasswordForm from "../../_components/reset-password-form";
import Footer from "@/components/home/footer";

export default function ResetPassword({
  params,
}: {
  params: { userId: string; otp: string };
}) {
  const t = useTranslations("resetPassword");
  const tHome = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      <ResetPasswordForm
        password={t("password")}
        locale={locale}
        passwordPlaceholder={t("passwordPlaceholder")}
        invalidPassword={t("invalidPassword")}
        confirmPassword={t("confirmPassword")}
        confirmPasswordPlaceholder={t("confirmPasswordPlaceholder")}
        passwordNotMatch={t("passwordNotMatch")}
        reset={t("reset")}
        toastMessage={t("toastMessage")}
        otp={t("otp")}
        otpPlaceholder={t("otpPlaceholder")}
        code={params.otp}
        invalidOtp={t("invalidOtp")}
        userId={params.userId}
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

import { useLocale, useTranslations } from "next-intl";
import HeaderContainer from "../_components/shared/HeaderContainer";
import { Button } from "@/components/ui/button";
import Settings from "./_components/Settings";

export default function SettingsPage() {
  const t = useTranslations("clientSettings");
  const t2 = useTranslations("loginForm");
  const t3 = useTranslations("signupForm");

  const locale = useLocale();
  let translation = {
    "generalSettings":t("generalSettings"),
    "productSettings":t("productSettings"),
    "syncProductPrices":t("syncProductPrices"),
    "syncProductQuantities":t("syncProductQuantities"),
    "productPricingSettings":t("productPricingSettings"),
    "consolidatePricing":t("consolidatePricing"),
    "viewOriginal":t("viewOriginal"),
    "withoutShipping":t("withoutShipping"),
    "includedShipping":t("includedShipping"),
    "shippingSettings":t("shippingSettings"),
    "shippingType":t("shippingType"),
    "shippedW":t("shippedW"),
    "pricesVAT":t("pricesVAT"),
    "autoPay":t("autoPay"),
    "delAndPack":t("delAndPack"),
    "paiementWhenRecieving":t("paiementWhenRecieving"),
    "save":t("save"),
    "orderSettings":t("orderSettings"),
    "sa":t("sa"),
  }
  return (
    <>
      <Settings
        locale={locale}
        settings={t("settings")}
        currentPassword={t("currentPassword")}
        newPassword={t("newPassword")}
        confirmPassword={t("confirmPassword")}
        saveChanges={t("saveChanges")}
        changePassword={t("changePassword")}
        changeAccountDetails={t("changeAccountDetails")}
        merchantID={t("merchantID")}
        name={t("name")}
        marketName={t("marketName")}
        marketLink={t("marketLink")}
        email={t("email")}
        phone={t("phone")}
        currentPasswordPlaceholder={t2("currentPasswordPlaceholder")}
        passwordPlaceholder={t2("passwordPlaceholder")}
        confirmPasswordPlaceholder={t3("confirmPasswordPlaceholder")}
        country={t("country")}
        passwordNotMatch={t3("passwordNotMatch")}
        translation={translation}
      />{" "}
    </>
  );
}

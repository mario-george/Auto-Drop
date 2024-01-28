import { useLocale, useTranslations } from "next-intl";
import HeaderContainer from "../_components/shared/HeaderContainer";
import { Button } from "@/components/ui/button";
import Settings from "./_components/Settings";

export default function SettingsPage() {
  const t = useTranslations("clientSettings");
  const locale = useLocale();

  return (
    <>
      <Settings
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
        country={t("country")}
      />{" "}
    </>
  );
}

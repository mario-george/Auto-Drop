import { useLocale, useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const locale = useLocale();

  return <></>;
}

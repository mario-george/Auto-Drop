import HeaderContainer from "../_components/shared/HeaderContainer";
import { useLocale, useTranslations } from "next-intl";
import Platforms from "@/components/icons/clientPages/Platforms";
import CartSVG from "@/components/icons/clientPages/CartSVG";
import AvailablePlatforms from "./_components/AvailblePlatforms";
export default function LinkAccount() {
  const locale = useLocale();
  const t = useTranslations("home");
  const t2 = useTranslations("linkAccount");
  const PlatformCards = [
    {
      image: "/salla.svg",
      alt: "salla",
      circleLink: true,
      imageW: 222,
      imageH: 125,
      authLink: "auth/auth-salla",
    },
    { image: "/shopify.svg", alt: "shopify", imageW: 240, imageH: 131 },
    { image: "/client/wix.svg", alt: "wix", imageW: 240, imageH: 131 },
    { image: "/client/twilio.svg", alt: "twilio", imageW: 240, imageH: 131 },
  ];
  const StoreCards = [
    {
      image: "/aliexpress.svg",
      alt: "aliexpress",
      circleLink: true,
      imageW: 212.5,
      imageH: 42.28,
      authLink: "auth/auth-aliexpress",
    },
    { image: "/amazon.svg", alt: "amazon", imageW: 188.65, imageH: 99.94 },
    { image: "/cj.svg", alt: "cj", imageW: 116.08, imageH: 99.94 },
  ];

  return (
    <>
      <HeaderContainer
        IconComponent={Platforms}
        title={t2("availablePlatforms")}
        className=" "
        locale={locale}
      />
      <AvailablePlatforms
        linkButton={t("linkButton")}
        linkButtonConnected={t("linkButtonConnected")}
        soon={t("soon")}
        Cards={PlatformCards}
        locale={locale}
      />

      <HeaderContainer
        IconComponent={CartSVG}
        title={t2("availableStores")}
        locale={locale}
      />

      <AvailablePlatforms
        locale={locale}
        linkButton={t("linkButton")}
        linkButtonConnected={t("linkButtonConnected")}
        soon={t("soon")}
        Cards={StoreCards}
        className="tab:!max-w-[76%]"
        cardClassName={`pt-12 tab:!pt-2 ms:!pt-[3rem] `}
        soonButtonClasses="mt-6 tab:mt-auto tab:pt-4"
        connectButtonClasses="mt-  mt-auto"
        store={true}
      />
    </>
  );
}

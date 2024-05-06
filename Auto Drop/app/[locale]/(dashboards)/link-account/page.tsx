import HeaderContainer from "../_components/shared/HeaderContainer";
import { useLocale, useTranslations } from "next-intl";
import Platforms from "@/components/icons/clientPages/Platforms";
import CartSVG from "@/components/icons/clientPages/CartSVG";
import AvailablePlatforms from "./_components/AvailblePlatforms";
import CheckMerchantElement from "./_components/CheckMerchantElement";
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
    <CheckMerchantElement/>
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
        soonButtonClasses="tab:mt-auto  ms:h-[30px] ms:mt-auto  tab:h-[40px]"
        cardClassName={`w-[45%] min-w-[45%] tab:min-w-0 mx-1 !my-1 ml:mx-2 ml:my-2 `}
        connectButtonClasses={`!px-0 text-sm ms:h-[30px] ms:mt-auto tab:h-[40px]`}
        imageWrapperClasses={`!mb-2 `}
        className={`tab:px-3  ${
          locale === "ar"
            ? `ms:pl-1 mm:pl-3 ml:pl-2`
            : `ms:pr-1 mm:pr-2 ml:pr-1`
        }`}
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
        className= {`tab:!max-w-[76%] tab:px-3  ${
          locale === "ar"
            ? `ms:pl-1 mm:pl-3 ml:pl-2`
            : `ms:pr-1 mm:pr-2 ml:pr-1`
        }`}
        cardClassName={`pt-12   tab:!pt-2 ms:!pt-[1.5rem] w-[45%] min-w-[45%] tab:min-w-0  mx-1 !my-1 ml:mx-2 ml:my-2`}
        imageWrapperClasses={`!mb-2 `}
        soonButtonClasses="mt-6 ms:h-[30px] tab:h-[40px] ms:mt-auto tab:mt-auto tab:pt-4 lapl:mt-6"
        connectButtonClasses="lapl:mt-12 ms:h-[30px] tab:h-[40px]"
        store={true}
      />
    </>
  );
}

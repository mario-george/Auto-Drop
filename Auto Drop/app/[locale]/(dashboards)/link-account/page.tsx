import HeaderContainer from "../_components/shared/HeaderContainer";
import CardsSection from "./_components/CardsSection";
import { useLocale, useTranslations } from "next-intl";
import Platforms from '@/components/icons/clientPages/Platforms'
import CartSVG  from '@/components/icons/clientPages/CartSVG';
export default function LinkAccount() {
  const locale = useLocale();
  const t = useTranslations("home");
  const t2 = useTranslations("linkAccount");

  return (<>
  <HeaderContainer  IconComponent={Platforms} title={t2('availablePlatforms')}  className=" "/>
       <CardsSection
        locale={locale}
        linkHeader={t("linkHeader")}
        subLink1={t("subLink1")}
        subLink2={t("subLink2")}
        linkButton={t("linkButton")}
        soon={t("soon")}
      />
  <HeaderContainer IconComponent={CartSVG} title={t2('availableStores')}/>

  </>
  );
}

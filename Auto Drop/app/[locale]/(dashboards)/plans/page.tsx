import Monthly from "../_components/plansComponents/Packages";
import { useLocale, useTranslations } from "next-intl";

export default function PlansPage() {
  const t = useTranslations("packages");
  const t2 = useTranslations("clientPlans");
  const locale = useLocale();

  return (<>
  <Monthly
    locale={locale}

    monthly={t("monthly")}
    PackagePro={t("Package Pro")}
    PackagePlus={t("Package Plus")}
    BasicPackage={t("Basic Package")}
    subscribtion={t("subscribtion")}
    SAR={t("SAR")}
    free={t("free")}
    remainingProducts={t2("remainingProducts")}
    remainingOrders={t2("remainingOrders")}
    subscriptionDate={t2("subscriptionDate")}
    subscriptionExpirationDate={t2("subscriptionExpirationDate")}
    plansTitle={t2("plansTitle")}
    productsNumber={t2("productsNumber")}
    ordersNumber={t2("ordersNumber")}
    tryForFree={t2("tryForFree")}
    
  />
  </>
  );
}

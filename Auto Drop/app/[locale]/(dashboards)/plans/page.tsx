import Monthly from "../_components/plansComponents/Packages";
import { useLocale, useTranslations } from "next-intl";
import PlanInfoSection from './_components/PlanInfoSection';
import PlanSection from "./_components/PlanSection";

export default function PlansPage() {
  const t = useTranslations("packages");
  const t2 = useTranslations("clientPlans");
  const locale = useLocale();
  let PlanSectionProps ={
    remainingProductsText:t2("remainingProducts"),
    remainingOrdersText:t2("remainingOrders"),
    subscriptionDateText:t2("subscriptionDate"),
    subscriptionExpirationDateText:t2("subscriptionExpirationDate"),locale

  }
  return (<>
    <span
          dir={`${locale == "ar" ? "rtl" : "ltr"}`}
          className="text-md py-2 lap:text-3xl  mb-5 mt-3 px-6"
        >
          {t2("plansTitle")}
        </span>

    <PlanSection
{...PlanSectionProps}
    />
 {/*  <Monthly
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
    
  /> */}
  <PlanInfoSection upgradeOrRenew={t2("upgradeOrRenew")} />

  </>
  );
}

import { useLocale, useTranslations } from "next-intl";

import Wallet from "./_components/Wallet";

export default function WalletPage() {
  const t = useTranslations("walletPage");

  const locale = useLocale();

  return (
    <>
      <Wallet
        locale={locale}
        wallet={t("wallet")}
        myCards={t("myCards")}
        addCard={t("addCard")}
        chargeWallet={t("chargeWallet")}
      />{" "}
    </>
  );
}

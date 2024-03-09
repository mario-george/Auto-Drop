import React from "react";
import HomePageCard, {
  ProfitsCard,
  SallaCard,
  TotalProfits,
  WalletComponent,
  WelcomeComponent,
} from "./HomePageCard";
import Progress from "./Progress";
import Image from "next/image";
import TableRenderer from "./TableComponents/TableRenderer";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
export default function HomePageRenderer(props: any) {
  const { locale, t } = props;
  let prodNotLinked = t("prodNotLinked");
  let numOfSales = t("numOfSales");

  let numOfOrders = t("numOfOrders");

  let platform = t("Platform");

  let prodLinked = t("prodLinked");

  let numOfProd = t("numOfProd");

  let goodMorning = t("gm");

  let totalProfits = t("tp");

  let profits = t("p");
  let wallet = t("w");
  let latestRequests = t("lr");
  let CustomerName = t("cn");
  let orderStatus = t("os");
  let date = t("d");
  let amount = t("a");
  let details = t("d2");
  let done = t("done");
  let beingPaid = t("being-paid");
  let canceled = t("Canceled");
  let totalProfits2 = t("totalProfits");
  let suspendedProfits = t("suspendedProfits");
  let availableCredits = t("availableCredits");
  console.log(availableCredits);
  return (
    <>
      <div className="HomePageContainer">
        <div className="grid tab:grid-cols-8 max-w-[97%]  ">
          <div className="col-span-1 tab:col-span-2 ">
            <WelcomeComponent goodMorning={goodMorning} />
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-12 sm:grid-cols-2 md:grid-cols-3 tab:grid-cols-6 lap:grid-cols-8 gap-4 max-w-[97%] lg:grid-rows-7">
          <div className="tab:col-span-2">
            <TotalProfits firstEl={totalProfits} />
          </div>
          <div className="tab:col-span-2">
            <HomePageCard
              firstEl={numOfProd}
              secondEl={"68"}
              ThirdEl={<Progress value={68} />}
              smallText={true}
              locale={locale}
            />
          </div>

          <div className="tab:col-span-2">
            <HomePageCard
              firstEl={prodLinked}
              secondEl={"13"}
              ThirdEl={<Progress gradientType="orange" value={13} />}
              locale={locale}
            />
          </div>
          <div className="tab:col-span-2">
            <HomePageCard
              firstEl={prodNotLinked}
              secondEl={"10"}
              ThirdEl={<Progress gradientType="red" value={10} />}
              locale={locale}
            />
          </div>
          <div className="tab:col-span-4 lap:col-span-2 row-span-2">
            <ProfitsCard
              firstEl={profits}
              totalProfits={totalProfits2}
              suspendedProfits={suspendedProfits}
              availableCredits={availableCredits}
              locale={locale}
            />
          </div>
          <div className="tab:col-span-2">
            <SallaCard
              firstEl={platform}
              ThirdEl={
                <Image
                  src={"/client/home/salla.svg"}
                  width={61}
                  height={61}
                  alt="salla"
                />
              }
            />
          </div>
          <div className="tab:col-span-2">
            <HomePageCard
              firstEl={numOfOrders}
              secondEl={"34"}
              ThirdEl={<Progress gradientType="green" value={34} />}
              locale={locale}
            />
          </div>
          <div className="tab:col-span-2">
            <HomePageCard
              firstEl={numOfSales}
              secondEl={"22"}
              ThirdEl={<Progress gradientType="blue" value={22} />}
              locale={locale}
            />
          </div>
          <div className="tab:col-span-2 tab:row-start-4">
            <WalletComponent wallet={wallet} value={"0.0"} />
          </div>
          <div className="col-span-1 tab:col-span-6 row-span-3">
            <TableRenderer
              date={date}
              CustomerName={CustomerName}
              details={details}
              amount={amount}
              orderStatus={orderStatus}
              latestRequests={latestRequests}
            />
          </div>
        </div>{" "}
      </div>
    </>
  );
}

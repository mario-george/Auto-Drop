import React from "react";
import HomePageCard, {
  ProfitsCard,
  SallaCard,
  TotalProfits,
  WelcomeComponent,
} from "./HomePageCard";
import Progress from "./Progress";
import Image from "next/image";

export default function HomePageRenderer(props: any) {
  const { t } = props;
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

  return (
    <>
      <div className="flex">
        <WelcomeComponent goodMorning={goodMorning} />
      </div>

      <div className="grid grid-cols-8 gap-4 max-w-[97%] grid-rows-5">
        <div className="col-span-2">
          <TotalProfits firstEl={totalProfits} />
        </div>
        <div className="col-span-2">
          <HomePageCard
            firstEl={numOfProd}
            secondEl={"68"}
            ThirdEl={<Progress value={68} />}
            smallText={true}
          />
        </div>

        <div className="col-span-2">
          <HomePageCard
            firstEl={prodLinked}
            secondEl={"13"}
            ThirdEl={<Progress gradientType="orange" value={13} />}
          />
        </div>
        <div className="col-span-2">
          <HomePageCard
            firstEl={prodNotLinked}
            secondEl={"10"}
            ThirdEl={<Progress gradientType="red" value={10} />}
          />
        </div>
        <div className="col-span-2 row-span-2">
          <ProfitsCard firstEl={profits} />
        </div>
        <div className="col-span-2">
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
        <div className="col-span-2">
          <HomePageCard
            firstEl={numOfOrders}
            secondEl={"34"}
            ThirdEl={<Progress gradientType="green" value={34} />}
          />
        </div>
        <div className="col-span-2">
          <HomePageCard
            firstEl={numOfSales}
            secondEl={"22"}
            ThirdEl={<Progress gradientType="blue" value={22} />}
          />
        </div>
      </div>
    </>
  );
}

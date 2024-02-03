"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/ProgressHome";

interface HomePageCardProps {
  firstEl?: any;
  secondEl?: any;
  ThirdEl?: React.ReactNode;
  smallText?: boolean;
}

export default function Page({
  firstEl,
  secondEl,
  ThirdEl,
  smallText,
}: HomePageCardProps) {
  return (
    <>
      <div className="flex justify-between items-center bg-white rounded-md min-w-[200px] max-w-[350px] shadow max-h-full px-2 py-5">
        <div
          className={`flex flex-col space-y-1 ${smallText ? `mx-3` : ``} px-3`}
        >
          <div className="whitespace-nowrap">{firstEl}</div>
          <div className="font-bold text-3xl">{secondEl}</div>
        </div>
        {ThirdEl}
      </div>
    </>
  );
}
export function TotalProfits({
  firstEl,
  last60Days = "last 60 days",
  amount = "923.786 SAR",
  profitPercentage = "4.5%+",
}: any) {
  return (
    <>
      <div className="flex justify-between bg-white rounded-md min-w-[200px] max-w-[350px] shadow min-h-full ">
        <div className="flex flex-col space-y-2">
          <div className="whitespace-nowrap">{firstEl}</div>
          <div className="whitespace-nowrap opacity-50">{last60Days}</div>
          <div className="whitespace-nowrap flex space-s-1">
            <span className="text-[#55A630]">{profitPercentage}</span>
            <span>{amount}</span>
          </div>
        </div>
        <svg
          width="221"
          height="62"
          viewBox="0 0 221 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 61L3.28125 60.456C5.5625 59.912 10.125 58.824 14.6875 49.743C19.25 40.6619 23.8125 23.5878 28.375 17.2376C32.9375 10.8873 37.5 15.261 42.0625 14.5915C46.625 13.922 51.1875 8.20934 55.75 10.5333C60.3125 12.8572 64.875 23.2177 69.4375 27.9317C74 32.6457 78.5625 31.7132 83.125 28.6204C87.6875 25.5275 92.25 20.2744 96.8125 19.9559C101.375 19.6375 105.938 24.2538 110.5 25.509C115.062 26.7643 119.625 24.6585 124.187 18.9891C128.75 13.3196 133.313 4.08652 137.875 4.77206C142.438 5.4576 147 16.0618 151.562 19.6519C156.125 23.2421 160.687 19.8181 165.25 21.5892C169.812 23.3603 174.375 30.3265 178.938 25.4884C183.5 20.6504 188.062 4.00828 192.625 1.38842C197.187 -1.23143 201.75 10.171 206.312 12.5914C210.875 15.0117 215.437 8.44995 217.719 5.16907L220 1.88819"
            stroke="#4680BC"
          />
        </svg>
      </div>
    </>
  );
}
export function WelcomeComponent({ goodMorning }: any) {
  const name = useSelector((state: any) => state.user.name);
  return (
    <>
      <div className="flex justify-between bg-white rounded-md max-w-[380px] min-w-[300px] shadow h-fit items-center my-2">
        <div className="flex space-s-1">
          <span>{goodMorning}</span>
          <span>{name}</span>
        </div>
        <Image
          src={`/client/home/cloud.svg`}
          alt={`cloud`}
          width={56.68}
          height={45.34}
        />
      </div>
    </>
  );
}

export function SallaCard({ firstEl, ThirdEl, smallText }: HomePageCardProps) {
  return (
    <>
      <div className="flex justify-between items-center bg-white rounded-md min-w-[200px] max-w-[350px] shadow max-h-full px-2 py-5">
        <div
          className={`flex flex-col space-y-1 ${smallText ? `mx-3` : ``} px-3`}
        >
          <div className="whitespace-nowrap">{firstEl}</div>
          <div className="font-bold text-2xl">Salla</div>
        </div>
        {ThirdEl}
      </div>
    </>
  );
}

export function ProfitsCard({
  firstEl,
  ThirdEl,
  firstVal = 52,
  secondVal = 21,
  thirdVal = 74,
}: any) {
  return (
    <>
      <div className="flex flex-col bg-white rounded-md min-w-[200px] max-w-[350px] shadow max-h-full px-2 py-5 space-y-3">
        <div className="flex">{firstEl}</div>
        <Separator />
        <div className="flex justify-between">
          <div className="font-bold">{firstVal}%</div>
          <Progress color="bg-[#f99c55]" value={firstVal} />
        </div>
        <div className="flex justify-between">
          <div className="font-bold">{secondVal}%</div>
          <Progress color="bg-[#26b34e]" value={secondVal} />
        </div>
        <div className="flex justify-between">
          <div className="font-bold">{thirdVal}%</div>
          <Progress value={thirdVal} color="bg-[#70A6E8]" />
        </div>
      </div>
    </>
  );
}

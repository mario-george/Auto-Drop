import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CurrencyFormatter from "../../products/_components/CurrencyFormatter";

export default function WalletUserCard({
  name,
  balance = 100,
  number = "239 555-0108",
  chargeWallet,
}: any) {
  return (
    <div className="bg-white rounded-lg text-[#253439]">
      <div className="max-w-[40%] flex flex-col justify-center border-2 border-gray-300 rounded-lg p-4 space-y-4">
        <div>{name}</div>
        <div className="text-2xl ">{CurrencyFormatter(balance)}</div>
        <div className="bg-[#ECEDEE] rounded-xl flex-1 -mx-4 py-4 px-2 ">
          {number}
        </div>
      </div>{" "}
      <div className="flex space-s-4 mt-4">
        <Input className="max-w-[20%]" />
        <Button className="bg-[#B29E84] hover:bg-[#B29E84]/90">
          {" "}
          {chargeWallet}
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Header({
  shops,
  toogleLang,
}: {
  shops: string;
  toogleLang: (lang: string) => void;
}) {
  let isActive = "aliexpress";
  let isActiveClasses = "shadow rounded-lg px-3 py-2 bg-[#f0f3f4]";
  return (
    <>
      <div className="text-2xl my-3">{shops}</div>
      <div className="bg-white rounded-lg shadow justify-between px-2 py-2 flex items-center">
        <div className="flex space-s-3 items-center">
          <div className={isActive === "amazon" ? isActiveClasses : ""}>
            <Image
              src={`/client/products/amazon.svg`}
              width={85}
              height={52}
              alt="amazon"
            />
          </div>
          <div className={isActive === "aliexpress" ? isActiveClasses : ""}>
            <Image
              src={`/client/products/aliexpress.svg`}
              width={96}
              height={22}
              alt="aliexpress"
            />
          </div>
          <div className={isActive === "cj" ? isActiveClasses : ""}>
            <Image
              src={`/client/products/cj.svg`}
              width={52}
              height={52}
              alt="cj"
            />
          </div>
        </div>
        <div className="space-s-3">
          <Button
            onClick={() => toogleLang("ar")}
            className="bg-[#b29e84] hover:bg-[#b29e84]"
          >
            AR
          </Button>
          <Button
            onClick={() => toogleLang("en")}
            className="bg-[#a4aaac] hover:bg-[#a4aaac]"
          >
            EN
          </Button>
        </div>
      </div>
    </>
  );
}

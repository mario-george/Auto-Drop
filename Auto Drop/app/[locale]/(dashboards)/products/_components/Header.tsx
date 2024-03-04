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
  let isActiveClasses = "shadow rounded-lg tab:px-3 tab:py-2 bg-[#f0f3f4]";
  return (
    <>
    <div className="text-2xl my-3">{shops}</div>
    <div className="HeaderContainer">

      <div className="InnerHeader tab:min-w-full ">
        <div className="InnerHeaderContainerStores ">
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
        <div className="InnerHeaderContainerStores">
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
    </div>
    </>
  );
}

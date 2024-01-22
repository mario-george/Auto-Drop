import NavBarSVG from "@/components/icons/ClientSVGs/NavBarSVG";
import ContactSVG from "@/components/icons/ClientSVGs/ContactSVG";
import CartSVG from "@/components/icons/ClientSVGs/CartSVG";
import HomePageSVG from "@/components/icons/ClientSVGs/HomePageSVG";
import ProductsSVG from "@/components/icons/ClientSVGs/ProductsSVG";
import OwnedProductsSVG from "@/components/icons/ClientSVGs/OwnedProducts";
import WalletSVG from "@/components/icons/ClientSVGs/WalletSVG";
import SettingsSVG from "@/components/icons/ClientSVGs/SettingsSVG";
import PlansSVG from "@/components/icons/ClientSVGs/PlansSVG";
import LinkingSVG from "@/components/icons/ClientSVGs/LinkingSVG";
import OrdersSVG from "@/components/icons/ClientSVGs/OrdersSVG";

type SvgComponent =
  | typeof NavBarSVG
  | typeof ContactSVG
  | typeof CartSVG
  | typeof HomePageSVG
  | typeof ProductsSVG
  | typeof OwnedProductsSVG
  | typeof WalletSVG
  | typeof SettingsSVG
  | typeof PlansSVG
  | typeof LinkingSVG
  | typeof OrdersSVG;

interface IconDataItem {
  icon: SvgComponent;
  text?: string;
}

const iconData: IconDataItem[] = [
  { icon: NavBarSVG, text: "Main Page" },
  { icon: ProductsSVG, text: "Products" },
  { icon: OwnedProductsSVG, text: "My Products" },
  { icon: CartSVG, text: "Cart" },
  { icon: OrdersSVG, text: "Orders" },
  { icon: PlansSVG, text: "Plans" },
  { icon: LinkingSVG, text: "Linking" },
  { icon: CartSVG, text: "Cart" },
  { icon: SettingsSVG, text: "Settings" },
  { icon: WalletSVG, text: "Wallet" },
  { icon: ContactSVG, text: "Contact" },
];

export default iconData;

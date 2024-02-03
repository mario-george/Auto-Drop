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
import { useTranslations } from "next-intl";

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
  text: string;
  route: string;
}

export const iconData: IconDataItem[] = [
  { icon: HomePageSVG, text: "homepage", route: "/" },
  { icon: ProductsSVG, text: "products", route: "/products" },
  { icon: OwnedProductsSVG, text: "myProducts", route: "/my-products" },
  { icon: CartSVG, text: "cart", route: "/cart" },
  { icon: OrdersSVG, text: "orders", route: "/orders" },
  { icon: PlansSVG, text: "plans", route: "/plans" },
  { icon: LinkingSVG, text: "linking", route: "/link-account" },
  { icon: SettingsSVG, text: "settings", route: "/settings" },
  { icon: WalletSVG, text: "wallet", route: "/wallet" },
  { icon: ContactSVG, text: "contact", route: "/contact" },
];

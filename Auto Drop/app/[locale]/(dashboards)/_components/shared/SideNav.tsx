import { useTranslations } from "next-intl";
import SideNavRenderer from './SideNavRenderer'
import {iconData} from "@/app/[locale]/(dashboards)/_components/constants/itemData";

const SideNav = () => {
  const t = useTranslations("clientSideNav");
  let iconInfo=iconData.map(e=>{
    return t(e.text)
  })
  return <SideNavRenderer iconInfo={iconInfo} />;
};

export default SideNav;

import Progress from "./_components/home-page/Progress";
import HomePageCard from "./_components/home-page/HomePageCard";
import { useTranslations } from "next-intl";
import HomePageRenderer from "./_components/home-page/HomePageRenderer";
export default function Home() {
  const t = useTranslations("clientHomePage");
  return (
    <>
      <HomePageRenderer t={t} />
    </>
  );
}

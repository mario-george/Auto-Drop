import Progress from "./_components/home-page/Progress";
import HomePageCard from "./_components/home-page/HomePageCard";
import { useLocale, useTranslations } from "next-intl";
import HomePageRenderer from "./_components/home-page/HomePageRenderer";
import MotionWrapper from "./_components/shared/MotionWrapper";
export default function Home() {
  const t = useTranslations("clientHomePage");
  const locale = useLocale();
  return (
    <>
      <MotionWrapper locale={locale}>
        <div className="p-4">
          <HomePageRenderer t={t} />
        </div>
      </MotionWrapper>
    </>
  );
}

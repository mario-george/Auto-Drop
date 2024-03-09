import Image from "next/image";

import MotionWrapper from "./MotionWrapper";

interface CardHeader {
  title: string;
  icon?: any;
  IconComponent?: React.ComponentType;
  className?: string;
  locale?: string;
  mdClasses?: string;
  headerClasses?: string;
}
export default function HeaderContainer({
  title,
  icon,
  IconComponent,
  className,
  locale,
  mdClasses,
  headerClasses,
}: CardHeader) {
  const isAr = locale==="ar"
  return (
    <MotionWrapper locale={locale} mdClasses={mdClasses}>
      <div
        className={`bg-white  text-[#253439] dark:bg-[#2e464f] dark:text-white  px-6 py-2 my-12 rounded-lg shadow ${isAr?`ml-3 tab:ml-3 tab:mr-3`:`mr-3 tab:mr-3 tab:ml-3`}   ${
          className ? className : null
        } ${headerClasses ? headerClasses : ``}`}
      >
        {icon && <Image src={icon} width={24} height={24} alt="icon" />}
        {IconComponent ? (
          <div className="flex  items-center space-s-4">
            <IconComponent />
            <div>{title}</div>
          </div>
        ) : (
          <div className="tab:mx-3">{title}</div>
        )}
      </div>
    </MotionWrapper>
  );
}

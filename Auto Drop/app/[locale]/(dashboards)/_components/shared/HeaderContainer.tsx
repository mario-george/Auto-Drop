import Image from "next/image";
interface CardHeader {
  title: string;
  icon?: any;
  IconComponent?: React.ComponentType;
  className?: string;
}
export default function HeaderContainer({
  title,
  icon,
  IconComponent,
  className,
}: CardHeader) {
  return (
    <div
      className={`bg-white  mx-1 lap:!mx-6 text-[#253439]  px-6 py-2 my-12 rounded-lg shadow  ${
        className ? className : null
      }`}
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
  );
}

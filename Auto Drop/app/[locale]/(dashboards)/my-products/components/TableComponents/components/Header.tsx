export default function Header({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <>
      <div className={`flex tab:text-[30px] text-[#253439] ${className}`}>
        {title}
      </div>
    </>
  );
}

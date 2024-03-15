import { Button } from "@/components/ui/button";
export default function ButtonsRenderer({ details }: { details: string }) {
  let buttonClasses = "rounded-lg bg-[#eaebec] p-0 px-4  text-[#253439] dark:text-black";

  return (
    <div className="flex flex-row-reverse gap-3 ">
      <Button className={buttonClasses}>{details}</Button>
    </div>
  );
}

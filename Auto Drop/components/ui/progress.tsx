import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, dir = "ltr", ...props }, ref) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Animate progress from 0 to the actual value
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < value ? prevProgress + 1 : value));
    }, 20);

    // Clean up interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-md p-[5px] bg-[#eaecec] !px-6",
        className
      )}
      dir={dir}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all overflow-hidden  "
        style={{ transform: dir === "rtl" ? `translateX(${100 - progress}%)` : `translateX(-${100 - progress}%)` }}
      >
        <div className="h-full w-full bg-[#253439] rounded-md  "></div>
      </ProgressPrimitive.Indicator>
      <div className="absolute left-0 right-[90%] top-0 bottom-0   bg-[#eaecec] z-[100] rounded-r-lg  "></div>
      <div className="absolute left-[1%] right-[90%] top-[30%] bottom-0  bg-[#253439] z-[101] h-[6px] rounded-l-lg  "></div>

    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

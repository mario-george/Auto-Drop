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
      setProgress((prevProgress) =>
        value && prevProgress < value ? prevProgress + 1 : value || 0
      );
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
        "relative h-6 w-full overflow-hidden rounded-md p-1 bg-[#eaecec]  border-2 border-[#bbc0c2]  ",
        className
      )}
      dir={dir}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all overflow-hidden  "
        style={{
          transform:
            dir === "rtl"
              ? `translateX(${100 - progress}%)`
              : `translateX(-${100 - progress}%)`,
        }}
      >
        <div className="h-full w-full bg-[#b29e84] rounded-md  "></div>
      </ProgressPrimitive.Indicator>
      <div
        className={`absolute  top-0 bottom-0   bg-[#eaecec] z-[100] rounded-r-lg ${
          dir == "rtl" ? `left-[90%] right-0 ` : `left-0 right-[90%]`
        }`}
      ></div>
      <div
        className={`absolute top-[20%] bottom-[10%]  bg-[#b29e84] z-[101] h-3 p-1 ${
          dir == "rtl"
            ? `rounded-r-lg  left-[90%] right-[1%] `
            : `rounded-l-lg  left-[1%] right-[90%]`
        } `}
      ></div>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

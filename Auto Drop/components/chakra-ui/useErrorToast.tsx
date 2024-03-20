import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
interface ErrorToastProps {
  description?: string;
  title?: string;
  errorButtonRef?: React.RefObject<HTMLButtonElement>;
}
export const useErrorToast = ({
  title,
  description,
  errorButtonRef,
}: ErrorToastProps) => {
  const toast = useToast();
  const [toastCount, setToastCount] =useState(0);
console.log("toastCount",toastCount)
  let ErrorComponent = <>
   { toastCount < 4 ? <div className="hidden">
      {" "}
      <Button
        onClick={() => {
          if (toastCount < 3) {
            toast({
              title,
              description,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
            setToastCount(toastCount + 1);
          } else {
            // setTimeout(() => setToastCount(0), 10000); // Reset the count after 10 seconds
          }
        }}
        ref={errorButtonRef}
        className="!hidden"
      >
        Show Toast
      </Button>
    </div>:<></>}</>
  
  return { ErrorComponent };
};

import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
interface SuccessToastProps {
    description?: string;
    title?: string;
    successButtonRef?: React.RefObject<HTMLButtonElement>;
  }
export const  useSuccessToast = ({
    title,
    description,
    successButtonRef,
  }: SuccessToastProps)=>{
    const toast = useToast();
    const [toastCount, setToastCount] =useState(0);
let SuccessComponent = <>
      { toastCount < 4 ? <div className="hidden">
      {" "}
      <Button
        onClick={() => {
          if (toastCount < 3) {
            toast({
              title,
              description,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "bottom-right",
            });
            setToastCount(toastCount + 1);
          } else {
            // setTimeout(() => setToastCount(0), 10000); // Reset the count after 10 seconds
          }
        }}
        ref={successButtonRef}
        className="!hidden"
      >
        Show Toast
      </Button>
    </div>:<></>}
    
    </>
return {SuccessComponent}
}
import { Button, useToast } from "@chakra-ui/react";
interface IPendingToast {
  promise?: Promise<any>;
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "top"
    | "bottom";
}
interface IPromiseHandler {
  promise?: Promise<any>;
  loadingPosition?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "top"
    | "bottom";
    successTitle:string
    
    loadingTitle:string
    loadingDescription:string
    descriptionSuccess:string
    isClosable:boolean
}
function usePendingToast({
  promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(200), 5000);
  }),
  position = "bottom-right",
}: IPendingToast) {
  const toast = useToast();

  const toastPromiseHandler = ({promise= new Promise((resolve, reject) => {
    setTimeout(() => resolve(200), 5000);
  }),loadingPosition,successTitle="Success",descriptionSuccess="Process done successfully.",loadingTitle="Loading",loadingDescription="Please Wait",isClosable=false}:IPromiseHandler)=>{
    toast.promise(promise, {
      // position: 'bottom-right',
      success: { title: successTitle, description:descriptionSuccess,isClosable},
      error: { title: "Promise rejected", description: "Something wrong",isClosable },
      loading: {
        title: loadingTitle,
        description: loadingDescription,
        position: loadingPosition,isClosable
      },
    });
  }
  let ToastButtonComponent =  <Button
  onClick={() => {
    toast.promise(promise, {
      // position: 'bottom-right',
      success: { title: "Promise resolved", description: "Looks great" },
      error: { title: "Promise rejected", description: "Something wrong" },
      loading: {
        title: "Promise pending",
        description: "Please wait",
        position: position,
      },
    });
  }}
>
  Show Toast
</Button>

  return {toastPromiseHandler,ToastButtonComponent}
}
export default usePendingToast;

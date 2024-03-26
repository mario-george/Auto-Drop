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
function usePendingToast({
  promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(200), 5000);
  }),
  position = "bottom-right",
}: IPendingToast) {
  const toast = useToast();
  return (
    <Button
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
  );
}
export default usePendingToast;

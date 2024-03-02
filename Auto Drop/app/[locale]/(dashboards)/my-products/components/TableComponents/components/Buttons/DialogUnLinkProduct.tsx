import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/[locale]/(dashboards)/_components/shared/AxiosInstance";
import Image from 'next/image'
export default function SubmitProducts({ sallaProductId,setLoadProducts }: any) {
  const router = useRouter();
  let submitHandler = async () => {
    const resp = await axiosInstance.delete(`/salla/deleteProduct/${sallaProductId}`);
    console.log(resp.data);
    if(resp.data.status){
      setLoadProducts((prev:boolean)=>!prev)
    }
  };
  let buttonClassL = `rounded-full
    bg-red-500
   px-2 py-2`;
  return (
    <>
      <Dialog submitHandler={submitHandler}>
      <Button className={buttonClassL} >
        <Image
          src={`/client/my-products/link.svg`}
          alt={`link`}
          width={24}
          height={24}
        />
      </Button>
      </Dialog>
    </>
  );
}

function Dialog({
  children,
  submitHandler,
}: {
  children: React.ReactNode;
  submitHandler: any;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to remove this product from your Salla list ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is not reversible{" "}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                submitHandler();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

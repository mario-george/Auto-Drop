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
import Image from "next/image";
import useLoader from "@/components/loader/useLoader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setKeyValue } from "@/store/productsSlice";
import {useToast } from "@/components/ui/use-toast";
export default function SubmitProducts({
  sallaProductId,
  setLoadProducts,
}: any) {
  const router = useRouter();
  const sallaToken = useSelector((state: any) => state.user.sallaToken);
  
  const { setLoading, LoaderComponent } = useLoader();
  const productsState = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const {toast } = useToast()
  let { reloadPage,loadingProductTable } = productsState;
  console.log("loadingProductTable",loadingProductTable)
  let submitHandler = async () => {
    if (!sallaToken || sallaToken=="" ) {
      toast({
        variant: "destructive",
        title: "Please link your account with salla and try again.",
      });
     

    
      return
    }
try{

  dispatch(
    setKeyValue({
      key: "loadingProductTable",
      value: true,
    })
  );
  const resp = await axiosInstance.delete(
    `/salla/deleteProduct/${sallaProductId}`
  );
  console.log(resp.data);
  dispatch(setKeyValue({ key: "reloadPage", value: !reloadPage }));
  if (resp.status >= 200 && resp.status < 300) {
/*     dispatch(
      setKeyValue({
        key: "loadingProductTable",
        value: false,
      })
    ); */
  }
}catch(err:any){
  console.log("err",err)
  if(err?.response?.data?.message.includes("Salla")){
    toast({variant:"destructive",description:"Please Link your account with salla and try again."})
      
      }  
  console.error(err)
}finally{
  dispatch(
    setKeyValue({
      key: "loadingProductTable",
      value: false,
    })
  );

}

  };
  let buttonClassL = `rounded-full bg-[#008767] hover:bg-[#008767]/90 px-2 py-2 w-[2rem] h-[2rem] tab:w-[3rem] tab:h-[3rem] hover:cursor-pointer `;
  return (
    <>
      {LoaderComponent}
      <Dialog submitHandler={submitHandler}>
        <div className={buttonClassL}>
          <Image
            src={`/client/my-products/link.svg`}
            alt={`link`}
            width={24}
            height={24}
            className="mx-auto my-auto  mt-[15%]"
          />
        </div>
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

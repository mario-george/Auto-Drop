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
export default function DeleteOptionDialog({
    children,
    deleteOptionHandler,messageHeader,messageDescription,index,optIndex,element
  }: {
    children: React.ReactNode;
    deleteOptionHandler: any;
    messageHeader: string;
    messageDescription: string;
    index:number,optIndex:number,element:any
  }){
    
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger>{children}</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
              {messageHeader}
              </AlertDialogTitle>
              <AlertDialogDescription>
        {messageDescription}
           
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-300 hover:bg-red-200"
                onClick={() => {
                  deleteOptionHandler(optIndex,element);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  

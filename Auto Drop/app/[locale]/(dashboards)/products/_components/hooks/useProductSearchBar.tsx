import { useState ,useRef} from "react"
import SearchProduct from "../../../_components/shared/ui/SearchProduct"
interface ProductSearchBarProps {
    locale:string
    searchByProd:string
}
type SearchInfo = {
    type: "category" | "image" |"allProducts"|"search";
    imageBytes: FormData | null;
    searchUrl: string;
    categoryName?: string;
  };
export default function useProductSearchBar({locale,searchByProd}:ProductSearchBarProps){
    const [searchUrl,setSearchUrl] = useState('')
    const [searchInfo,setSearchInfo] = useState<SearchInfo>({searchUrl:'',type:"allProducts",imageBytes:null})
    const fileInputRef = useRef<HTMLInputElement>(null);
    const urlInputRef = useRef<HTMLInputElement>(null)
    let updateImageHandler = ()=>{
        if(fileInputRef.current)
        fileInputRef.current.click();

    }
   /*  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event?.target?.files || event?.target?.files?.length === 0) return;
        const file = event.target.files[0];
        
        const reader = new FileReader();
      console.log("file",file)
        reader.onloadend = function () {
            if (reader.result instanceof ArrayBuffer) {
                const imageBytes = new Uint8Array(reader.result); // This is the image file in bytes
                // Do something with imageBytes...
      console.log("imageBytes",imageBytes)

                setSearchInfo({type:"image",imageBytes,searchUrl:''})
              }
        }
      
        reader.readAsArrayBuffer(file);
      }; */
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event?.target?.files || event?.target?.files?.length === 0) return;
        const file = event.target.files[0];
        
        const reader = new FileReader();
        reader.onloadend = function () {
            if (reader.result instanceof ArrayBuffer) {
                const imageBytes = new Uint8Array(reader.result); // This is the image file in bytes
    
                // Create a File object from imageBytes
                const imageFile = new File([imageBytes], file.name, { type: file.type });
                let formData = new FormData();
                formData.append('file', imageFile);
    
                setSearchInfo({type:"image",imageBytes: formData,searchUrl:''})
            }
        }
      
        reader.readAsArrayBuffer(file);
        event.target.value = '';

    };
      const triggerSearchByUrl = ()=>{

        if(  urlInputRef?.current?.value ){


            let url = urlInputRef.current.value
            setSearchInfo({searchUrl:url,imageBytes:null,type:"search"})
        }


        
      }
let SearchBarComponent = (<SearchProduct
    isAr={locale == "ar"}
    placeholder={searchByProd}
    onChange={(event) => {setSearchUrl(event.target.value)}}
    value={searchUrl}
    className="flex justify-center"
    productSearchBar={true}
    updateImageHandler={updateImageHandler}
    handleFileChange={handleFileChange}
    fileInputRef={fileInputRef}
    triggerSearchByUrl={triggerSearchByUrl}
    urlInputRef={urlInputRef}
  />)
    return {searchUrl,SearchBarComponent,searchInfo,setSearchInfo}

}

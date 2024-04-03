import { Textarea } from '@/components/ui/textarea';
import HeaderText from '../../../../wallet/_components/HeaderText';
interface OrderDetailsNotesProps{
notesText:string;
merchantStore:any
locale:string
}
export default function useOrderDetailsNotes({notesText,merchantStore,locale}:OrderDetailsNotesProps){
let notesPlaceholder = `You are using dropshipping service in or  store, please change shipper name in shipping invoice to: ${merchantStore} and don't put any logo of aliexpress on the products.` 
// order-memo
return <>
<HeaderText isAr={locale=="ar"} title={notesText}/>
<Textarea>
{notesPlaceholder}
</Textarea>
</>
    
}
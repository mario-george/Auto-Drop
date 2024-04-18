import { Textarea } from '@/components/ui/textarea';
import HeaderText from '../../../../wallet/_components/HeaderText';
import { useRef } from 'react';
interface OrderDetailsNotesProps{
commentsText:string;
merchantStore:any
locale:string
}
export default function useOrderDetailsNotes({commentsText,merchantStore,locale}:OrderDetailsNotesProps){
    const orderNotesRef = useRef<null|HTMLTextAreaElement>(null)
let notesPlaceholder = `You are using dropshipping service in or  store, please change shipper name in shipping invoice to: ${merchantStore} and don't put any logo of aliexpress on the products.` 
// order-memo
let OrderNotes= <>
<HeaderText isAr={locale=="ar"} title={commentsText}/>

<div className="bg-white rounded-xl px-3 py-6">

<Textarea className="bg-[#f0f3f4]" ref={orderNotesRef}>
{notesPlaceholder}
</Textarea>
</div>
</>
return {OrderNotes,orderNotesRef}
    
}
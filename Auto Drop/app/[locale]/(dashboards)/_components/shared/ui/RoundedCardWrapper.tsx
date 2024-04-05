interface RoundedCardWrapperProps {
    children: React.ReactNode;
    className?: string;

}
const RoundedCardWrapper = ({children,className}:RoundedCardWrapperProps)=>{
    return <>
<div className={`bg-white rounded-lg shadow text-[#253439] dark:bg-[#2E464F] dark:text-white ${className}`}>
{children}
</div>
    
    </>
}
export default RoundedCardWrapper 
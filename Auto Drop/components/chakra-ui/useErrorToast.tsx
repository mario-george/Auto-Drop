import { Button, useToast } from '@chakra-ui/react'
interface ErrorToastProps {
    description?:string
    title?:string;
    errorButtonRef?:React.RefObject<HTMLButtonElement>
}
export const useErrorToast = ({title,description,errorButtonRef}:ErrorToastProps) => {
    const toast = useToast()

let ErrorComponent =   <div className="hidden">   <Button
onClick={() =>
  toast({
    title,
    description,
    status: 'error',
    duration: 9000,
    isClosable: true,
    position: 'bottom-right',
  })
}
ref={errorButtonRef}
className="!hidden"
>
Show Toast
</Button></div>
return {ErrorComponent}
} 
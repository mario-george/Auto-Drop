import { Button, useToast } from '@chakra-ui/react'
interface ErrorToastProps {
    description?:string
    title?:string
}
export const useErrorToast = ({title,description}:ErrorToastProps) => {
    const toast = useToast()

let ErrorComponent =     <Button
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
>
Show Toast
</Button>
return {ErrorComponent}
} 
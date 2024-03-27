import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface AlertDialogProps {
  title: string;
  description?: string;
  deleteSubmitHandler: (value:string) => Promise<void>;
  deleteButtonText?: string;
}
export default function useAlertDialog({
  title,
  description = "Are you sure? You can't undo this action afterwards.",
  deleteSubmitHandler,
  deleteButtonText = "Delete",
}: AlertDialogProps) {
  const [identifier,setIdentifier ] = useState<string>("");
  const openModelHandler = (value:string)=>{
    setIdentifier(value)
    onOpen()
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  let deleteButton = (
    <Button colorScheme="red" onClick={onOpen}>
      Delete Element
    </Button>
  );
  let AlertDialogComponent = (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  deleteSubmitHandler(identifier);
                }}
                ml={3}
              >
                {deleteButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
  return { openModelHandler, AlertDialogComponent };
}

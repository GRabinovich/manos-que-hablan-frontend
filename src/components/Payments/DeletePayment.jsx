import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
export const DeletePayment = ({
  isOpenWin,
  onClose,
  conceptoUser,
  onConfirm,
}) => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpenWin} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseas Eliminar este pago?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Concepto: {conceptoUser}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={onConfirm}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

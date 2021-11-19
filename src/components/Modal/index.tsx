import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    ModalFocusScope,
    useDisclosure,
  } from "@chakra-ui/react"

const ModalComponent = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
        <Button onClick={onOpen}>CARRINHO</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Carrinho de Compras</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      alguma coisa
    </ModalBody>

    <ModalFooter>
      
    </ModalFooter>
  </ModalContent>
</Modal>
        </>
    )
}

export default ModalComponent
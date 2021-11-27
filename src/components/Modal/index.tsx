import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Image,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/Auth";
import { useCart } from "../../providers/Cart";
import { FaShoppingCart } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

const ModalComponent = () => {
  const { cart, subItemCart, removeAllFromCart, removeItem, addItemCart } =
    useCart();
  const { user } = useAuth();

  // const total = [0, 1, 2, 3].reduce(function(acumulador, valorAtual) {
  //   return acumulador + valorAtual;
  // }, 0)

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <FaShoppingCart size="0.5x" color="gray" />{" "}
        <p font-size="2px">{cart.length}</p>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carrinho de Compras dx {user.name}</ModalHeader>
          <ModalCloseButton />
          {cart ? (
            <ModalBody>
              {cart.map((item) => (
                
                <Flex key={item.id}>
                  <Image src={item.image} />
                  <Box>
                    <Heading fontSize="21px">{item.title}</Heading>
                    <Flex>
                      <Box w='50px' h='50px'>
                        <AiOutlinePlusCircle
                          onClick={() => addItemCart(item)}
                          cursor="pointer"
                          size="0.2x"
                          color="green"
                        />
                      </Box>
                      <Heading font-size="20px" color="black">
                        {item.quantity}
                      </Heading>
                      <Box  w='50px' h='50px'>
                        <AiOutlineMinusCircle
                          onClick={() => subItemCart(item)}
                          cursor="pointer"
                          size="0.2x"
                          color="red"
                        />
                      </Box>
                    </Flex>
                  </Box>
                  <Box w='50px' h='50px'>
                    <BiTrash
                      cursor="pointer"
                      size="0.2x"
                      color="gray"
                      onClick={() => removeItem(item.id)}
                    />
                  </Box>
                </Flex>
              ))}
            </ModalBody>
          ) : (
            <ModalBody>Carrinho de compras vazio! :/</ModalBody>
          )}
          <hr />
          <ModalFooter display="column">
            <Heading padding="10px" fontSize="21px">
              Total: R$ {}
            </Heading>
            <Button w="100%" onClick={removeAllFromCart}>
              Remover todxs
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;

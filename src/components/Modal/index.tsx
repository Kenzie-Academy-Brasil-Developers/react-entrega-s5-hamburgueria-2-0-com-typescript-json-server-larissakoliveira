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
  Text,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/Auth";
import { useCart } from "../../providers/Cart";
import { FaShoppingCart } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { theme } from "../../styles/theme";

const ModalComponent = () => {
  const { cart, subItemCart, removeAllFromCart, removeItem, addItemCart } =
    useCart();
  const { user } = useAuth();

  const total = cart.reduce(function (acc, actual) {
    return acc + actual.quantity * actual.price;
  }, 0); 

  const totalItems = cart.reduce(function (acc, actual) {
    return acc + actual.quantity
  },0)

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button _hover={{ transform: "translateY(-6px)"}} onClick={onOpen}>
        <Box w='20px'>
        <FaShoppingCart size='23px'color="gray" />{" "}
        </Box>
        <Text fontWeight='bold' ml='5px'marginBottom='17px' color={theme.colors.green.primary50} fontSize="16px">{totalItems}</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={theme.colors.green.primary50}>
            Carrinho dx {user.name}
          </ModalHeader>
          <ModalCloseButton />
          {cart.length > 0 ? (
            <ModalBody>
              {cart.map((item) => (
                <Flex
                  justifyContent="space-between"
                  marginBottom="10px"
                  key={item.id}
                >
                  <Box borderRadius="8px" w="80px" bg="gray.200">
                    <Image padding="7px" src={item.image} />
                  </Box>
                  <Flex>
                    <Box marginLeft="10px">
                      <Heading fontSize="21px">{item.title}</Heading>
                      <Flex>
                        <Box w="25px" h="25px">
                          <AiOutlinePlusCircle
                            onClick={() => addItemCart(item)}
                            cursor="pointer"
                            size="0.2x"
                            color="green"
                          />
                        </Box>
                        <Text
                          padding="0 10px"
                          font-size="27px"
                          color="gray.600"
                        >
                          {item.quantity}
                        </Text>
                        <Box w="25px" h="25px">
                          <AiOutlineMinusCircle
                            onClick={() => subItemCart(item)}
                            cursor="pointer"
                            size="0.2x"
                            color="red"
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                  <Box w="25px" h="25px">
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
            <ModalBody>Carrinho <strong>VAZIO</strong> :(( <Text> Não fique com fome!</Text></ModalBody>
          )}
          <hr />
          <ModalFooter display="column">
            <Flex justifyContent="space-between">
              <Heading padding="10px" fontSize="21px">
                Total
              </Heading>
              <Heading padding="10px" fontSize="21px">
                R$ {total.toFixed(2)}
              </Heading>
            </Flex>
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

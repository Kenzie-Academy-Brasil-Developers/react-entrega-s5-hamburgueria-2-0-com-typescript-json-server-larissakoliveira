import {
  Box,
  Button,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  Heading,
  Center,
  Input
} from "@chakra-ui/react";
import logo from "../../assets/imgs/logo.png";
import Card from "../Card";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useDisclosure } from "@chakra-ui/hooks";
import { useAuth } from "../../providers/Auth";
import ModalComponent from "../Modal";
import { theme } from "../../styles/theme";
import { useProducts } from "../../providers/Products";
import { useState } from "react";
import { Navigate } from "react-router";
import profilePic from "../../assets/imgs/garfieldProfile.png"

const Home = () => {


  const [inputValue, setInputValue] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { productNameFiltered } = useProducts();

  const { logout, user, authToken } = useAuth();


  if(!authToken){
    return <Navigate to='/'/>
  }


  return (
    <Flex flexDirection="column">
      <Flex
        as="header"
        width="100%"
        backgroundColor="white"
        padding="10px"
        position="fixed"
        flexDirection="row"
        justifyContent="space-around"
      >
        <Image width="195px" height="45px" src={logo} />
        <Flex alignItems= 'center' >

        <InputGroup mr='15px' flexDirection="column">
          <Input
            name="Pesquisa"
            placeholder="Digitar pesquisa"
            width="300px"
            height="40px" 
            border-radius="8px"
            padding="[0px, 10px, 0px, 15px]"
            bg="white"
            onChange={(event) => setInputValue(event.target.value)}
            />
          <InputRightElement
            onClick={() => productNameFiltered(inputValue)}
            cursor="pointer"
            borderRadius="8px"
            height="40px" 
            marginRight='8px'
            bg={theme.colors.green.primary50}
            >
              <FaSearch color='white' />
          </InputRightElement>
        </InputGroup>

        <ModalComponent />
        <Button ml='50px' padding="2px" colorScheme="white" onClick={onOpen}>
          <HiOutlineLogout size="2x" color={theme.colors.green.primary50} />
        </Button>
            </Flex>
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay mt={["13vh", "10vh"]} />
          <DrawerContent backgroundColor='#ecf0f1' borderRadius='5px' ml="auto" mt="58px" w={["450px", "350px"]}>
            <DrawerHeader
            padding='15px 5px 5px 5px'
              borderBottomWidth="1px"
              borderColor="gray.50"
              color="gray.400"
              display='flex'
              justifyContent='space-around'
              alignItems='center'
            >
              <Text>
              {user.email}
              </Text>
              <Image borderRadius='8px' w='85px' h='80px' src={profilePic} />
            </DrawerHeader>
            <DrawerBody marginBottom='5px'paddingTop='15px'>
              <Flex
                align="center"
                onClick={logout}
                _hover={{ cursor: "pointer" }}
              >
                <Center
                  w="45px"
                  h="45px"
                  bg="red.600"
                  fontSize="2xl"
                  borderRadius="md"
                >
                  <HiOutlineLogout
                    font-size="30px"
                    color="white"
                  />
                </Center>
                <Box ml="4">
                  <Heading as="h2" fontSize="lg">
                    Já vai {user.name}?
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Sim, partiu academia agora!
                  </Text>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Box>
        <Card />
      </Box>
    </Flex>
  );
};

export default Home;

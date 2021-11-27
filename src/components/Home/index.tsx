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
import React, { useState } from "react";

const Home = () => {
  const btnRef = React.useRef();

  const [inputValue, setInputValue] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { productNameFiltered } = useProducts();

  const { logout, user } = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex
        as="header"
        width="100%"
        backgroundColor="white"
        padding="10px"
        position="fixed"
        flexDirection="row"
      >
        <Image width="160px" height="37px" src={logo} />
        <InputGroup flexDirection="column">
          <Input
            name="Pesquisa"
            placeholder="Digitar pesquisa"
            width="300px"
            height="45px"
            left="800px"
            border-radius="8px"
            padding="[0px, 10px, 0px, 15px]"
            bg="white"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <InputRightElement
            onClick={() => productNameFiltered(inputValue)}
            cursor="pointer"
            borderRadius="8px"
            bg={theme.colors.green.primary50}
          >
              <FaSearch />
          </InputRightElement>
        </InputGroup>

        <ModalComponent />
        <Button padding="0" colorScheme="white" onClick={onOpen}>
          <HiOutlineLogout size="2x" color={theme.colors.green.primary50} />
        </Button>
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay mt={["13vh", "8vh"]} />
          <DrawerContent ml="auto" mt="80px" w={["450px", "350px"]}>
            <DrawerHeader
              borderBottomWidth="1px"
              borderColor="gray.50"
              color="gray.400"
            >
              {user.email}
            </DrawerHeader>
            <DrawerBody>
              <Flex
                align="center"
                onClick={logout}
                _hover={{ cursor: "pointer" }}
              >
                <Center
                  w="60px"
                  h="60px"
                  bg="red.600"
                  fontSize="2xl"
                  borderRadius="md"
                >
                  <HiOutlineLogout
                    font-size="30px"
                    color={theme.colors.green.primary50}
                  />
                </Center>
                <Box ml="4">
                  <Heading as="h2" fontSize="lg">
                    Sair da minha conta
                  </Heading>
                  <Text color="gray.300" fontSize="small">
                    Sair da minha conta agora
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

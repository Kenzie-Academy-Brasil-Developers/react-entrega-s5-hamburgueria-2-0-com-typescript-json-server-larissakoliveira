import {
  Flex,
  Grid,
  Heading,
  Image,
  Box,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/Auth/AuthContext";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as React from "react";
import logo from "../../assets/imgs/logo.png";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";

interface FormProps {
  handleForm: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
}

interface LoginData {
  email: string;
  password: string;
}

// interface form {
//   onSubmit: () => void;
// }

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required("Informe email!"),
    password: yup
      .string()
      .min(6, "Minimo de 6 caracteres.")
      .required("Informe senha!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (
    event: React.FormEvent<HTMLFormElement>,
    userData: LoginData
  ) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <>
      <Flex
        padding={["10px 15px", "10 15px", "0px", "0px"]}
        alignItems="center"
        justifyContent="center"
        height={["auto", "auto", "100vh", "100vh"]}
        color="white"
      >
        <Grid
          onSubmit={() => handleForm}
          as="form"
          padding="30px 15px"
          bg="white"
          mt={["4", "4", "0"]}
          w={["100%", "100%", "40%", "40%"]}
        >
          <Heading size="sm" color="gray.600">
            Login
          </Heading>
          <VStack mt="6" spacing="5">
            <Box w="90%">
              <Input
                placeholder="Digite seu email"
                type="email"
                error={errors.email}
                icon={FaEnvelope}
                {...register("email")}
                mb="8px"
              />
              <Input
                type="password"
                placeholder="Digite sua senha"
                error={errors.password}
                icon={FaLock}
                {...register("password")}
                mt="5px"
              />
            </Box>
          </VStack>
          <VStack mt="4" spacing="5">
            <Button
              onClick={() => login}
              bg="green.primary"
              w="90%"
              color="white"
              h="60px"
              borderRadius="8px"
              _hover={{
                background: "green.primary50",
              }}
              type="submit"
            >
              Logar
            </Button>
            <Text w="70%" textAlign="center" color="gray.400">
              Crie sua conta para saborear muitas delícias e matar sua fome!
            </Text>
            <Button
              bg="gray.0"
              w={["200px", "452px"]}
              color="gray.300"
              h="60px"
              borderRadius="8px"
              onClick={() => navigate("/register")}
              _hover={{
                background: "gray.200",
              }}
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>

        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "column", "column"]}
          alignItems="center"
        >
          <Box w={["100%", "100%", "50%", "50%"]} paddingRight="100px">
            <Image
              src={logo}
              alt="doit"
              w={["120px", "120px", "200px", "200px"]}
            />
          </Box>
          <Box border="1px" borderColor="gray.400"  w={["100%", "100%", "50%", "50%"]} paddingRight="100px">
            <Heading mt="4" as="h1">
              <Text
                fontWeight="light"
                color="gray.300"
                fontSize="sm"
                maxW="350px"
              >
                A vida é como um sanduíche, é preciso recheá-la com os{" "}
                <b>melhores</b> ingredientes.
              </Text>
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;

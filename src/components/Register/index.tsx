import { Box, Button, Flex, FormControl, Grid, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { DeepMap, FieldError, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/Auth/AuthContext";
import { Input } from "../Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import logo from "../../assets/imgs/logo.png";
import { Link } from "@chakra-ui/react"

interface FormData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface SignupData {
  signUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
}

const Register = () => {

    const navigate = useNavigate();

    const { signUp } = useAuth();

    const schema = yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
        password: yup.string().required("Senha obrigatória"),
        confirm_password: yup
          .string()
          .required("Confirmação de senha obrigatória")
          .oneOf([yup.ref("password")], "Senhas diferentes"),
      });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data: FormData) => {
    signUp(data)
  };


  return (
    <Flex>
     <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "column", "column"]}
          alignItems="center"
        >
          <Grid>
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
          </Grid>
        </Flex>
        <Grid>
       <Flex
        padding={["10px 15px", "10 15px", "0px", "0px"]}
        alignItems="center"
        justifyContent="center"
        height={["auto", "auto", "100vh", "100vh"]}
        color="white"
        flexDirection='column'
        >
        <HStack spacing='250px'>
          
          <Heading size="sm" color="gray.600">
            Cadastro
          </Heading>handleForm
          <Link text-decoration='underline'color="gray.300" href='/login'>
            Retornar para o login
          </Link>
          </HStack>
        <FormControl
          as="form"
          onSubmit={handleSubmit(handleForm)}
          id= 'register_Form'
          padding="30px 15px"
          bg="white"
          mt={["4", "4", "0"]}
          w={["100%", "100%", "100%", "100%"]}
        >
          
          <VStack mt="6" spacing="5">
            <Box w="90%">
              <Input
                label="Nome"
                placeholder="Digite seu nome"
                type="text"
                error={errors.name}
                {...register("name")}
                mb="8px"
              />
                  <Input
                label="Email"
                placeholder="Digite seu email"
                type="email"
                error={errors.email}
                icon={FaEnvelope}
                {...register("email")}
                mb="8px"
              />
              <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                error={errors.password}
                icon={FaLock}
                {...register("password")}
                mt="5px"
              />
                <Input
                label="Confirme sua senha"
                type="password"
                placeholder="Digite sua senha"
                error={errors.confirmPassword}
                icon={FaLock}
                {...register("confirmPassword")}
                mt="5px"
              />
            </Box>
          </VStack>
          <VStack mt="4" spacing="5">
          
            <Button
              bg="gray.0"
              type="submit"
              form='register_Form'
              w={["200px", "452px"]}
              color="gray.300"
              h="60px"
              borderRadius="8px"
              onClick={() => signUp}
              _hover={{
                background: "gray.200",
              }}
            >
              Cadastrar
            </Button>
          </VStack>
        </FormControl>
      </Flex>
      </Grid>
    </Flex>
  );
};

export default Register
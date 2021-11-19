import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useForm
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/Auth/AuthContext";
import { Input } from "../Input";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import logo from "../../assets/imgs/logo.png";
import { Link } from "@chakra-ui/react";

interface FormData {
  email: string;
  password: string;
  name: string;
}

const Register = () => {

  const { signUp } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Informe seu nome"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().min(6, "Minimo de 6 caracteres.").required("Senha obrigatória"),
    confirmPassword: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (data: FormData) => {
    console.log(data)
    signUp(data);
  };

  return (
    <Flex>
      <Stack
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "column", "column"]}
        alignItems="flex-start"
        ml="50px"
      >
     
          <Box w={["100%", "100%", "50%", "50%"]} paddingRight="100px">
            <Image
              src={logo}
              alt="doit"
              w={["120px", "120px", "200px", "200px"]}
            />
          </Box>
          <Box
            border= "1px solid #E0E0E0"
            w={["100%", "100%", "45%", "45%"]}
            paddingRight="100px"
            box-shadow= "0px 4px 40px -20px #00000040"
            margin= "15px 0px"
            borderRadius= "5px"
          >
              <Text
                fontWeight="light"
                color="gray.300"
                fontSize="sm"
                maxW="350px"
                padding="10px"
              >
                A vida é como um sanduíche, é preciso recheá-la com os{" "}
                <strong>melhores</strong> ingredientes.
              </Text>
              </Box>
              <Grid templateColumns="repeat(6, 3fr)" gap={6} mt="5" w="20%">
            {Array.from({ length: 18 }).map((_, i) => (
              <Box
                borderRadius="10px"
                bg="gray.100"
                h="11px"
                w="11px"
                key={i}
              />
            ))}
          </Grid>
      </Stack>
        <Grid
          mr='200px'
          as="form"
            onSubmit={handleSubmit(handleForm)}
          padding={["10px 15px", "10 15px", "0px", "0px"]}
          alignItems="center"
          justifyContent="flex-start"
          height={["auto", "auto", "100vh", "100vh"]}
          color="white"
          flexDirection="column"
        >
          <HStack spacing="18">
            <Heading size="sm" color="gray.600">
              Cadastro
            </Heading>
            <Link text-decoration="underline" mr='60px' color="gray.300" href="/">
              Retornar para o login
            </Link>
          </HStack>
          <Stack
            padding="20px 15px"
            mt={["4", "4", "0"]}
            w={["100%", "100%", "100%", "100%"]}
            marginRight="100px"
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
                  icon={FaUser}
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
            <Box mt="4" spacing="5">
            <Button
              type="submit"
              bg="gray.100"
              w={["200px", "90%"]}
              color="gray.300"
              h="50px"
              borderRadius="8px"
              _hover={{
                background: "gray.100",
              }}
              >
                Cadastrar
              </Button>
            </Box>
        
        </Stack>
       
        </Grid>
    </Flex>
  );
};

export default Register;

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
import { useAuth } from "../../providers/Auth";
import { Input } from "../Input";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import logo from "../../assets/imgs/logo.png";
import { Link } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import { Navigate } from "react-router";
import { useMediaQuery } from '@chakra-ui/react'

interface FormData {
  email: string;
  password: string;
  name: string;
}

const Register = () => {

  const [isLargerThan720] = useMediaQuery('(min-width: 720px)')

  const { signUp, authToken } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Enter your name"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().min(6, "Minimum 6 characters.").required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Password confirmation required")
      .oneOf([yup.ref("password")], "Passwords mismatch"),
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


  if(!!authToken){
    return <Navigate to='/home'/>
  }


  return (
    <Flex
    flexDirection={["column", "column", "row", "row"]}
    alignItems="center"
    justifyContent="center"
    height={["auto", "auto", "100vh", "100vh"]}
    padding={["10px 15px", "10 15px", "0px", "0px"]}
    >
     <Flex
          w={["100%", "100%", "92%", "95%"]}
          justifyContent="center"
          flexDirection={["column", "column", "column", "column"]}
          alignItems="flex-start"
          marginLeft= {["0", "0", "70px", "100px"]}
        >
     
          <Box w={["100%", "100%", "50%", "50%"]}>
            <Image
              src={logo}
              alt="doit"
              w={["120px", "120px", "200px", "200px"]}
            />
          </Box>
          <Flex
            border= "1px solid #E0E0E0"
            w={["100%", "100%", "80%", "85%"]}
            boxShadow= "0px 4px 40px -20px #00000040"
            margin= "15px 0px"
            borderRadius= "5px"
            alignItems= "center"
            padding='5px'
          >
              <Box marginLeft='10px' borderRadius= "5px" backgroundColor= "#27AE601A" w='100px' h='50px'>
            <FiShoppingBag size='1x' color='green' />
            </Box>
              <Text
                fontWeight="light"
                color="gray.300"
                fontSize="sm"
                maxW="350px"
                padding="10px"
              >
                Life is like a sandwich, you have to fill it with the{" "}
                <strong>best</strong> ingredients.
              </Text>
              </Flex>
              {
              isLargerThan720 ? 
              <Grid templateColumns="repeat(6, 3fr)" gap={6} mt="5" w="20%" ml="10px">
            {Array.from({ length: 18 }).map((_, i) => (
              <Box
                borderRadius="10px"
                bg="gray.100"
                h="11px"
                w="11px"
                key={i}
              />
            ))}
          </Grid> : <hr/>}
                      
      </Flex>
        <Grid
        mr={["0", "0", "70px", "80px"]}
         as="form"
         onSubmit={handleSubmit(handleForm)}
         id="login_Form"
         padding="20px 15px"
         mt={["4", "4", "20px", "40px"]}
         w={["100%", "100%", "70%", "75%"]}
        >
          <Flex justifyContent='space-between'>
            <Heading size="sm" color="gray.600">
              Sign Up
            </Heading>
            <Link text-decoration="underline" color="gray.600" href="/">
              go back to login
            </Link>
          </Flex>
        
            <VStack mt="6" spacing="5">
              <Box w="100%">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  error={errors.name}
                  {...register("name")}
                  icon={FaUser}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  error={errors.email}
                  icon={FaEnvelope}
                  {...register("email")}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password}
                  icon={FaLock}
                  {...register("password")}
                />
                <Input
                  label="Confirm your password"
                  type="password"
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                  icon={FaLock}
                  {...register("confirmPassword")}
                />
              </Box>
            </VStack>
            <Box mt="4" spacing="5" display="flex" justifyContent="center">
            <Button
              type="submit"
              bg="gray.100"
              w={["200px", "100%"]}
              color="gray.600"
              h="50px"
              borderRadius="8px"
              _hover={{
                background: "gray.100",
              }}
              >
                Sign Up
              </Button>
            </Box>
        
        </Grid>
    </Flex>
  );
};

export default Register;

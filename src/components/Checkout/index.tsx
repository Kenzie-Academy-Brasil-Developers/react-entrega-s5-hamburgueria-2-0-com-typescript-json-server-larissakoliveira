import { Box, Button, Heading, Flex, Text, Link, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { useCart } from "../../providers/Cart";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import pix from "../../assets/imgs/pix.png";
import logo from "../../assets/imgs/logo.png";

interface handleTokenProps {
  token: string;
}

const Checkout = () => {
  const toast = useToast();

  const { total } = useCart();

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  const handleToken = async ({ token }: handleTokenProps) => {
    const response = await axios.post(
      "https://lv0cd.sse.codesandbox.io/checkout",
      {
        token,
      }
    );
    const { status } = response.data;
    console.log(response.data);
    console.log(status);
    if (status === "success") {
      toast({
        position: "top-right",
        description:
          "Compra efetuada! Enviamos um email com todas informações!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top-right",
        description:
          "Compra efetuada! Enviamos um email com todas informações!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
     <Flex justifyContent='space-between'>
      <img src={logo} width='180px' height='150px' alt="logo"/>
      <Button left='0' margin="0 auto" m='2px'bg="#50AF60" color="#fff" onClick={goBack}>
        Volte a BurguerKenzie
      </Button>
     </Flex>
      <Heading textAlign="center">Checkout</Heading>
      

      <Box borderRadius="10px" bg='#dfe7fd' margin="0 auto" w={["90%", "90%", "50%"]} h={["90%", "90%", "50%"]}>
        <Heading
          margin="30px 0"
          padding='30px'
          textAlign="center"
          fontWeight="bold"
          fontSize="1.8rem"
        >
          Métodos de pagamento
        </Heading>

        <Flex mb='45px'borderBottom='solid 1pix black'justifyContent="center">
          <Text mt='10px'fontWeight="bold" mr="20px">⇨ &nbsp;&nbsp;&nbsp;Pague com cartão de crédito ou débito </Text>

          <StripeCheckout
            stripeKey="pk_test_51KAJfzHiM8NvJQ7K3VfCt1fmxHFd8QuvV938DQcITum6UO4ANpO4BTjWsdIfZed0jvE9fPNFyH6DFi9lyqNmz3SV004eraSwlH"
            token={() => handleToken}
            billingAddress
            shippingAddress
            amount={total * 100}
          />
        </Flex>
        
              <Box mb='25px'>
          <Flex justify="center">

        <Text fontWeight="bold" mt="20px" textAlign="center">
            
        ⇨ &nbsp;&nbsp;&nbsp;Envie pix e recibo para &nbsp;</Text> <Link  mt="20px" mr='20px' fontWeight="bold" color="#5EB6E9">
             burguer@bk.com 
          </Link>
          <Image width="90px" height="30px" alt="pix" mt='10px' cursor='pointer'src={pix} />
               </Flex>
               <Flex alignItems="center"flexDirection="column">

         
          <Text mr='70px' mb='30px' fontWeight="bold">
          e logo entregaremos seu pedido!
        </Text>
               </Flex>
              </Box>
      </Box>
    </>
  );
};

export default Checkout;

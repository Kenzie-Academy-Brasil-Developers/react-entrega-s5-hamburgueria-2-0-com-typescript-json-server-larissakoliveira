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
    if (status === "success") {
      toast({
        position: "top-right",
        description:
          "All set! We just sent a confirmation email!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top-right",
        description:
          "Done! We sent a email with all informations!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
     <Flex justifyContent='space-between' mb="10px">
      <img src={logo} width='180px' height='150px' alt="logo"/>
   
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
          Payment methods
        </Heading>

        <Flex flexDirection="column" mb='45px'borderBottom='solid 1pix black'justifyContent="center">
          <Text textAlign="center" fontWeight="bold" mr="20px">⇨ &nbsp;&nbsp;&nbsp;Payment with credit or debit card</Text>
          <Box m="0 auto">
          <StripeCheckout
            stripeKey="pk_test_51KAJfzHiM8NvJQ7K3VfCt1fmxHFd8QuvV938DQcITum6UO4ANpO4BTjWsdIfZed0jvE9fPNFyH6DFi9lyqNmz3SV004eraSwlH"
            token={() => handleToken}
            billingAddress
            shippingAddress
            amount={total * 100}
          />
          </Box>
        </Flex>
        
              <Box mb='25px'>
          <Flex justify="center">

        <Text fontWeight="bold" mt="20px" textAlign="center">
            
        ⇨ &nbsp;&nbsp;&nbsp;Send a pix(venmo) to <Link href="tel:021999999999">(21) 99999-9999</Link>, soon we will delivery your products!</Text> 

               </Flex>
               <Flex alignItems="center"flexDirection="column">         
         
          <Box paddingBottom="25px">

          <Image width="90px" height="30px" alt="pix" mt='10px' cursor='pointer'src={pix} />
          </Box>
       
               </Flex>
              </Box>
      </Box>
      <Button display="flex" margin="5px auto" bg="#50AF60" color="#fff" onClick={goBack}>
        Go back to BurguerKenzie
      </Button>
    </>
  );
};

export default Checkout;

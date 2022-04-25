import { Box, Flex, Button, Grid, Image, Text, Heading, VStack } from "@chakra-ui/react";
import { useCart } from "../../providers/Cart";
import { useProducts } from "../../providers/Products";
import { theme } from "../../styles/theme";

const Card = () => {

  const { filteredProducts } = useProducts();
  const { addToCart } = useCart();

  return (
    
    
    <Grid w='100%' templateColumns='repeat(auto-fill, minmax(230px, 1fr))' gap={10} padding='8' mt='65px'>
      { 
       filteredProducts.length > 0 ? (

        filteredProducts.map((item, index) => (
          <Box
          _hover={{ borderColor: "gray.300" }}
          transition="border 0.2s, ease 0s, transform 0.2s"
          borderWidth="1px"
          borderColor="gray.50"
          boxShadow='xl' 
          padding="7"
          w={["80vw", "auto"]}
          key={index}
          
          >
          <Flex bg='gray.100'justifyContent="center" w='100%'>
        <Image
        height="150px"
        width="150px"
        src={item.image}
        alt={item.title}
        />
        </Flex>
        <VStack padding='15px'spacing='3' flexDirection="column" alignItems={["center","center",'flex-start']}>
        <Text textAlign='center' fontWeight='bold'>{item.title}</Text>
        <Text color='gray.400' margin='5px'>{item.category}</Text>
        <Heading fontSize='16px' color={theme.colors.green.primary50} textAlign='center' >$<b>{item.price.toFixed(2)}</b></Heading>
        <Button position='static' padding='20px'color='white' bg='gray.300' onClick={() => addToCart(item as any)}>ADD TO CART</Button>
        </VStack>
        </Box>
        ))) : (
          
          <Box textAlign="center" mt="50px" fontSize={["18px", "18px", "21", "21px"]} >Product doesn't exist!</Box>
          
        )}
      </Grid>
  )};

export default Card;

import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { useCart } from "../../providers/Cart";
import { useProducts } from "../../providers/Products";

const Card = () => {

  const { products, filteredProducts } = useProducts();
  const { addToCart } = useCart();

  return (
    <Grid  marginTop='80px' padding="20px" templateColumns="repeat(4, 1fr)" gap={90}>
      {  filteredProducts.length > 0 ?
       filteredProducts.map((item) => (
      <Box
      borderRadius="5px"
      border="1px solid"
      borderColor="gray.300"
      w="100%"
      h="100%"
      padding='40px'
      key={item.id}
      >
      <Image
      height="158px"
      widht="158px"
      src={item.image}
      alt={item.title}
      />
      <Text textAlign='center' fontWeight='bold'>{item.title}</Text>
      <Text margin='5px'>{item.category}</Text>
      <h3>Preço: <b>{item.price.toFixed(2)}</b></h3>
      <Button onClick={() => addToCart(filteredProducts as any)}>Adicionar</Button>
      </Box>))
      :
      products.map((item, index) => (
        <Box
        key={index}
        borderRadius="5px"
        border="1px solid"
        borderColor="gray.300"
        w="100%"
        h="100%"
        padding='40px'
        >
        <Image
        height="158px"
        widht="158px"
        src={item.image}
        alt={item.title}
        />
        <Text textAlign='center' fontWeight='bold'>{item.title}</Text>
        <Text margin='5px'>{item.category}</Text>
        <h3>Preço: <b>{item.price.toFixed(2)}</b></h3>
        <Button onClick={() => addToCart(item as any)}>Adicionar</Button>
        </Box>
        ))
       
      }
    </Grid>
  )};

export default Card;

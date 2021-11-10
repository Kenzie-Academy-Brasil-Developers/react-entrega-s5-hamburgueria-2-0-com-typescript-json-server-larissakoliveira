import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { useProducts } from "../../providers/Products";

const Card = () => {
  const { products } = useProducts();

  return (
    <Grid padding="20px" templateColumns="repeat(4, 1fr)" gap={90}>
      {products.map((item) => (
        <Box
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
          <Button >Adicionar</Button>
        </Box>
      ))}
    </Grid>
  );
};

export default Card;

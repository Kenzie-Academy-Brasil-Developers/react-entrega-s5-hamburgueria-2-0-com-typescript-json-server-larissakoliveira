import { Box, Button, Grid, Image } from "@chakra-ui/react";
import { useProducts } from "../../providers/Products";

const Card = () => {
  const { products } = useProducts();

  return (
    <Grid padding='25px' templateColumns="repeat(4, 1fr)" gap={280}>
      {products.map((item) => (
        <Box w="100%" h="7">
        <Image height='158px' widht='158px' src={item.image} alt={item.title}/>
        <h2>{item.title}</h2>
        <p>{item.category}</p>
        <h3>{item.price.toFixed(2)}</h3>
        <Button >Adicionar</Button>
        </Box>
      ))}
    </Grid>
  );
};

export default Card;

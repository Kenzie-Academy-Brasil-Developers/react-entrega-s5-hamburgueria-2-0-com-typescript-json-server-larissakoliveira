import { Box, Grid, Image } from "@chakra-ui/react";
import { useProducts } from "../../providers/Products";

const Card = () => {
  const { products } = useProducts();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {products.map((item) => (
        <Box w="100%" h="10">
        <Image src={item.image} alt={item.title}/>
        <h2>{item.title}</h2>
        <p>{item.category}</p>
        <h3>{item.price}</h3>
        </Box>
      ))}
    </Grid>
  );
};

export default Card;

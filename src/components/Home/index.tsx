import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/imgs/logo.png";
import { Input } from "../Input";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../Card";


const Home = () => {
    return(
        <Flex flexDirection='column'>
            <Box>
            <Image
                width='160px'
                height= '37px'
                src={logo}
                />
                <Input 
                name ='teste'
                placeholder ='Digitar pesquisa'
                width= '365px'
                height = '60px'
                top = '-20px'
                left = '800px'
                border-radius = '8px'
                padding ='[0px, 10px, 0px, 15px]'
                icon={AiOutlineSearch}
                bg='white'
            />
            </Box>
            <Box>
                <Card/>
            </Box>
        </Flex>
    )
}

export default Home
import { Box, Button, Flex, Icon, Image, useDisclosure} from "@chakra-ui/react";
import logo from "../../assets/imgs/logo.png";
import { Input } from "../Input";
import Card from "../Card";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../providers/Auth/AuthContext";
import ModalComponent from "../Modal";


const Home = () => {

   
    const{ logout } = useAuth();
    return(
        
        <Flex flexDirection='column'>
            <Box>
                <ModalComponent/>
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
                bg ='white'
                icon= {FaSearch}
            />
            </Box>
            <Button onClick={logout}>
            Logout
            </Button>
            <Box>
                <Card/>
            </Box>
        </Flex>
    )
}

export default Home
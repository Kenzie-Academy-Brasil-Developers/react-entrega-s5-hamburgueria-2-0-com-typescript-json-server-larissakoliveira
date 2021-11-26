import { useToast } from "@chakra-ui/toast";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";
import { useAuth } from "../Auth";

interface CartProviderProps {
  children: ReactNode;
}

interface CartProductsData {
  title: string;
  image: string;
  type: string;
  price: number;
  id: number;
  userId: number;
  quantity: number;
  total: number;
}


interface CartProviderData {
  cart: CartProductsData[];
  addToCart: (
    product: CartProductsData
  ) => void;
  removeAllFromCart: () => void;
  getCart: () => void;
  removeItem: (item:number) => void;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: CartProviderProps) => {

  const toast = useToast();

  const { authToken } = useAuth();
  
  const userId = localStorage.getItem("@hamburkenzie:userId")

  const [cart, setCart] = useState<CartProductsData[]>(
    [] as CartProductsData[]
  );


  const getCart = useCallback(() => {
    api
      .get(`cart/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const addToCart = (product: CartProductsData) => {
    const productWithUserId = { ...product, userId };
    if (cart.every((item) => item.id !== product.id)) {
      api
        .post("/cart", productWithUserId, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          getCart();
          toast({
            position: "top",
            description: "Produto adicionado com sucesso",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        position: "top",
        description: "Produto já adicionado",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const removeItem = (item:number) => {
      api
      .delete(`/cart/${item}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        getCart()
        toast({
          position: "top",
          description: "Produtos removidos com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
    }

  

  const removeAllFromCart = () => {
    cart.map((item)=> {      
      api
      .delete(`/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        getCart()
        toast({
          position: "top",
          description: "Produtos removidos com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
    }
    )
  }
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeAllFromCart, getCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
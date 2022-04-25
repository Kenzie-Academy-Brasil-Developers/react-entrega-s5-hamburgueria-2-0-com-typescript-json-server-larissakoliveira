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
  subItemCart: (item:CartProductsData) => void;
  addItemCart: (item:CartProductsData) => void;
  total: number;
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
  const total = cart.reduce(function (acc, actual) {
    return acc + actual.quantity * actual.price;
  }, 0); 


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
  }, []);

  

  const addToCart = (product: CartProductsData) => {
    const productWithUserId = { ...product, userId, "quantity": 1 };
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
            position: "top-left",
            description: `${product.title} added to cart`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        position: "top-left",
        description: "Product already in the cart",
        status: "warning",
        duration: 4000,
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
          position: "top-left",
          description: "Product removed",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
    }

    const subItemCart = (item:CartProductsData) => {
      if(item.quantity > 1){

        api.patch(`/cart/${item.id}`, {quantity: item.quantity - 1},{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          getCart()
        toast({
          position: "top-left",
          description: `${item.title} removed`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
       }) 
       .catch((err) => console.log(err));
      }else {
        removeItem(item.id)
      }
    };


    const addItemCart = (item:CartProductsData) => {
        api.patch(`/cart/${item.id}`, {quantity: item.quantity + 1},{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          getCart()
        toast({
          position: "top-left",
          description: `One more ${item.title} added`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
       }) 
       .catch((err) => console.log(err));
    
    };

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
          position: "top-left",
          description: "Products successfully removed",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
    }
    )
  }
  
  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeAllFromCart, getCart, removeItem, subItemCart, addItemCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };

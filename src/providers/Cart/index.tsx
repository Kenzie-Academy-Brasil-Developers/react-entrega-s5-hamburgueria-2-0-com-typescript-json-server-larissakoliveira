// import { createContext, ReactNode, useEffect, useContext, useState } from "react";
// import api from "../../services/api";

// interface CartProps {
//   children: ReactNode;
// }

// interface CartInterface {
//     image: string;
//     title: string;
//     category: string;
//     price: number;
//     id: number;
// }

// interface CartProviderData {
//     addProduct: (product: CartInterface) => void;
//     deleteProduct: (product: CartInterface) => void;
//     Cart: CartInterface[];
//     filteredCart: CartInterface[];
//     productNameFiltered:(searchedProd: string) => void;
// }

// const CartContext = createContext<CartProviderData>({} as CartProviderData);

// export const CartProvider = ({ children }: CartProps) => {
  
//   const [cart, setCart] = useState<CartInterface[]>([]as CartInterface[])

//   const [filteredCart, setFilteredCart] = useState<CartInterface[]>(
//     [] as CartInterface[]
//   );

//   useEffect(() => {
//     api
//       .get("/Cart/")
//       .then((response) => {
//         setCart(response.data);
//         setFilteredCart(response.data);
//       })
//       .catch((err) => {
//           console.log(err)
//       })
// }, []);



// const addProduct = () => {

// }

//   return (
//     <CartContext.Provider value={{ addProduct, deleteProduct }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

const teste = () => {

    return(
        <></>
    )
}

export default teste
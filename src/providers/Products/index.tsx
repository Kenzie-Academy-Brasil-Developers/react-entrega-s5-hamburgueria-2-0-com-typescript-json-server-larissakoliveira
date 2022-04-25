import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useState,
} from "react";
import api from "../../services/api";
import React, { SetStateAction } from 'react';

interface ProductsProps {
  children: ReactNode;
}

interface ProductsInterface {
  title: string;
  image: string;
  category: string;
  price: number;
  id: number;
  userId: number;
  quantity: number;
  total: number;
}


interface ProductsProviderData {
  products: ProductsInterface[];
  filteredProducts: ProductsInterface[];
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
}

const ProductsContext = createContext<ProductsProviderData>(
  {} as ProductsProviderData
);


export const ProductsProvider = ({ children }: ProductsProps) => {
  
  
  const [products, setProducts] = useState<ProductsInterface[]>(
    [] as ProductsInterface[]
    );
          
      const [inputValue, setInputValue] = useState("");
     
      useEffect(() => {
        api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
    const filteredProducts = products.filter(
      (item) =>
        item.title.toLowerCase().includes(inputValue) ||
        item.category.toLowerCase().includes(inputValue)
    );


  return (
    <ProductsContext.Provider
      value={{ inputValue, setInputValue, products, filteredProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

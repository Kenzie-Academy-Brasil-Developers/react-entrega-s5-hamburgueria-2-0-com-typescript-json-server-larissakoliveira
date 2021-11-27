import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useState,
} from "react";
import api from "../../services/api";

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
  productNameFiltered: (searchedProd: string) => void;
}

const ProductsContext = createContext<ProductsProviderData>(
  {} as ProductsProviderData
);

export const ProductsProvider = ({ children }: ProductsProps) => {


  const [products, setProducts] = useState<ProductsInterface[]>(
    [] as ProductsInterface[]
  );

  const [filteredProducts, setFilteredProducts] = useState<ProductsInterface[]>(
    [] as ProductsInterface[]
  );


  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const productNameFiltered = (searchedProd: string) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchedProd.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };



  return (
    <ProductsContext.Provider
      value={{ products, filteredProducts, productNameFiltered }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

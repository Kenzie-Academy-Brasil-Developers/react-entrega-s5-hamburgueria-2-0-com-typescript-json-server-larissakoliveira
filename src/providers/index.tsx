import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./Auth/AuthContext";
import { ProductsProvider } from "./Products";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ProductsProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ProductsProvider>
  </AuthProvider>
);

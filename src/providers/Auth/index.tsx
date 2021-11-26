import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "@chakra-ui/toast";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  login:  ({ email, password }: User) => void;
  logout: () => void;
  authToken: string;
  signUp: (data: User) => void;
  user: any;
  userId: any;
}

interface User {
  email: string;
  password: string;
  name?: string;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

const AuthProvider = ({ children }: AuthProviderProps) => {

  const toast = useToast();

  const navigate = useNavigate();
  
  const [authToken, setAuthToken] = useState<string>(localStorage.getItem("@hamburkenzie:accessToken") || "");
  const [userId, setUserId] = useState(localStorage.getItem("@hamburkenzie:userId")) || "";
  const [user, setUser] = useState(localStorage.getItem("@hamburkenzie:user")) || "";



  const login = ({ email, password }:User) => {
    api
      .post("/login", {email, password})
      .then((response) => {
        localStorage.setItem("@hamburkenzie:accessToken", response.data.accessToken);
        localStorage.setItem("@hamburkenzie:userId", JSON.stringify(response.data.user.id))
        localStorage.setItem("@hamburkenzie:user", JSON.stringify(response.data.user))
        setAuthToken(response.data.accessToken);
        setUser(response.data.user);
        setUserId(response.data.user.id)
        toast({
          title: "Login feito com sucesso!",
          description:  `Bem vindx, ${response.data.user.name}!`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  const signUp = (userData:User) => {
    api
      .post("/register", userData)
      .then((response) => {
        toast({
          title: "Conta criada com sucesso!",
          description: "Faça seu login",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Cadastro inválido!",
          description: "Usuário já existente!",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{authToken, logout, login, signUp, user, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth }
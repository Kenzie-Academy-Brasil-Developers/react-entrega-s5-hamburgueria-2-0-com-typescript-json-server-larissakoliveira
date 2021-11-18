import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  login:  ({ email, password }: User) => void;
  logout: () => void;
  authToken: string;
  signUp: (data: User) => void;
}

interface User {
  email: string;
  password: string;
  name?: string;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

const AuthProvider = ({ children }: AuthProviderProps) => {

  const navigate = useNavigate();
  
  const [authToken, setAuthToken] = useState(localStorage.getItem("@tokenHamburkenzie") || "");

  const login = ({ email, password }:User) => {
    api
      .post("/login", {email, password})
      .then((response) => {
        localStorage.setItem("@tokenHamburkenzie", response.data.accessToken);
        setAuthToken(response.data.accessToken);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const signUp = (userData:User) => {
    console.log(userData)
    api
      .post("/register", userData)
      .then((response) => {
        localStorage.setItem("@tokenHamburkenzie", response.data.token);
        setAuthToken(response.data.token);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{authToken, logout, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth }
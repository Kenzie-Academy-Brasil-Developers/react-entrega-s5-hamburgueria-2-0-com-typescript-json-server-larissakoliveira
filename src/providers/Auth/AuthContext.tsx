import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface AuthProps {
  children: ReactNode;
}

interface AuthProviderData {
  login: (userData:usrDataLogin) => void;
  logout: () => void;
  authToken: string;
  signUp: (userData:usrDataSignUp) => void;
}

interface usrDataSignUp {
    email: string;
    password: string;
    name: string;
}

interface usrDataLogin {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProps) => {

  const navigate = useNavigate();
  
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const login = (userData:usrDataLogin) => {
    api
      .post("/users/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  const signUp = (userData:usrDataSignUp) => {
    api
      .post("/users/register", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, logout, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import Login from "../components/Login";
import { Route, Routes as Switch} from "react-router";
import Home from "../components/Home";
import Register from "../components/Register";

const Routes = () => {
  return (
    <Switch>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/" element={<Home/>}/>
    </Switch>
  );
};

export default Routes;
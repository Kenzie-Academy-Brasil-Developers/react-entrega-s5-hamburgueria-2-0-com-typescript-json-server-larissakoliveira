import Login from "../components/Login";
import { Route, Routes as Switch} from "react-router";
import Home from "../components/Home";
import Register from "../components/Register";

const Routes = () => {
  return (
    <Switch>
       <Route path="/" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={<Home/>}/>
    </Switch>
  );
};

export default Routes;
import logo from "./logo.svg";
// import './App.css';
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Order from "./components/Order/Order";
import Inventory from "./components/Inventory/Inventory";
import { Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import RequirAuth from "./components/RequirAuth/RequirAuth";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Shop></Shop>}></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route
          path="/order"
          element={
            <RequirAuth>
              <Order></Order>
            </RequirAuth>
          }
        ></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<LogIn></LogIn>}></Route>
        <Route path="/inventory" element={<Inventory></Inventory>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;

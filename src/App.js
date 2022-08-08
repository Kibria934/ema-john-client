import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RequirAuth from "./components/RequirAuth/RequirAuth";
import Loading from "./components/loading/Loading";
import About from "./components/About/About";

const LogIn = React.lazy(() => import("./components/LogIn/LogIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const Inventory = React.lazy(() => import("./components/Inventory/Inventory"));
const Header = React.lazy(() => import("./components/Header/Header"));
const Order = React.lazy(() => import("./components/Order/Order"));
const Shop = React.lazy(() => import("./components/Shop/Shop"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}

export default App;

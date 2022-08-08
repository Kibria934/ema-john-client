import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import "./Header.css";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import logo from "../../images/Logo.svg";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/shop">Shop</Link>
        <Link to="/order">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/about">About</Link>
        {user ? (
          <button onClick={() => signOut(auth)}>SignOut</button>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useCart from "../../Hook/useCart";
import useProducts from "../../Hook/useProducts";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewCart from "../ReviewCart/ReviewCart";
import "./Order.css";

const Order = () => {
  const [user, loading] = useAuthState(auth);
  const [products, setProducts] = useProducts();
  const [cart, setCart] = useCart(products);

  loading && <p>loadin...</p>;
  const handleRmoveProduct = (product) => {
    const rest = cart.filter((pd) => pd._id !== product._id);
    setCart(rest);
    removeFromDb(product._id);
  };
  const navigate = useNavigate();
  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((product) => (
          <ReviewCart
            key={product._id}
            product={product}
            handleRmoveProduct={handleRmoveProduct}
          ></ReviewCart>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart}>
          <Link to={""}>
            <button className="clear-btn">
              Clear Cart
              <FontAwesomeIcon
                icon={faTrash}
                style={{ marginLeft: "10px" }}
              ></FontAwesomeIcon>
            </button>
          </Link>
          <button
            onClick={() => {
              navigate("/inventory");
            }}
            className="review-btn"
          >
            Proceed Checkout
            <FontAwesomeIcon
              style={{ marginLeft: "10px" }}
              icon={faArrowRight}
            ></FontAwesomeIcon>
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Order;

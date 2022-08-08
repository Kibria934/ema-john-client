import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Suspense, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useCart from "../../Hook/useCart";
import Loading from "../loading/Loading";
import "./Order.css";
import useProducts from "../../Hook/useProducts";
import { removeFromDb } from "../../utilities/fakedb";

const Cart = React.lazy(() => import("../Cart/Cart"));
const ReviewCart = React.lazy(() => import("../ReviewCart/ReviewCart"));

const Order = () => {
  const [user, loading] = useAuthState(auth);
  const [products, setProducts, cartLoading] = useProducts();
  const [cart, setCart] = useCart(products);

  useEffect(() => {
    return cartLoading && <Loading />;
  }, []);

  const handleRmoveProduct = (product) => {
    const rest = cart.filter((pd) => pd._id !== product._id);
    setCart(rest);
    removeFromDb(product._id);
  };
  const navigate = useNavigate();

  return (
    <Suspense fallback={<Loading />}>
      <div className="shop-container">
        <div className="product-container">
          {cart?.map((product) => (
            <ReviewCart
              key={product._id}
              product={product}
              handleRmoveProduct={handleRmoveProduct}
            ></ReviewCart>
          ))}
        </div>
        <div
          style={{ backgroundColor: "var(--primaryClr)" }}
          className="card-container"
        >
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
    </Suspense>
  );
};

export default Order;

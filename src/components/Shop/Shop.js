import {
  faArrowRightArrowLeft,
  faArrowRightFromBracket,
  faDeleteLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import useCart from "../../Hook/useCart";
import Loading from "../loading/Loading";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import "./Shop.css";

const Product = React.lazy(() => import("../Product/Product"));
const Cart = React.lazy(() => import("../Cart/Cart"));

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    loading && <Loading />;
  }, [loading]);

  useEffect(() => {
    fetch(
      `https://ema-john-kibria.herokuapp.com/product?page=${page}&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [page, size]);

  useEffect(() => {
    fetch("https://ema-john-kibria.herokuapp.com/productCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const page = Math.ceil(count / 10);
        setPageCount(page);
      });
  }, []);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find((product) => product._id === selectedProduct._id);
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exist.quantity += 1;
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };
  const handleClear = () => {
    const procced = window.confirm(
      "Are you really want to delete the cart Data?"
    );
    if (procced) {
      setCart([]);
      const storedCartData = localStorage.removeItem("shopping-cart");
    }
  };

  return (
    <div className="shop-container">
      {/* ----product container--------- */}
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            handleAddToCart={handleAddToCart}
            key={product._id}
          ></Product>
        ))}
      </div>
      {/* ----------Card container ------*/}
      <div className="card-container">
        <Cart cart={cart}>
          <Link to={""}>
            <button onClick={handleClear} className="clear-btn">
              Clear Cart
              <FontAwesomeIcon
                icon={faTrash}
                style={{ marginLeft: "10px" }}
              ></FontAwesomeIcon>
            </button>
          </Link>
          <Link to={"/order"}>
            <button className="review-btn">
              Review Order
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                style={{ marginLeft: "10px" }}
              ></FontAwesomeIcon>{" "}
            </button>
          </Link>
        </Cart>
      </div>
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={page === number ? "selected" : ""}
            key={number}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select
          onChange={(e) => setSize(e.target.value)}
          className="pagination-option"
        >
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
        </select>
      </div>
    </div>
  );
};

export default Shop;

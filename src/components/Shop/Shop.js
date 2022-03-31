import {
  faArrowRightArrowLeft,
  faArrowRightFromBracket,
  faDeleteLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../Hook/useCart";
import useProducts from "../../Hook/useProducts";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useProducts();
  const [cart, setCart] = useCart(products);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find((product) => product.id === selectedProduct.id);
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exist.quantity += 1;
      newCart = [...rest, exist];
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
  };
  return (
    <div className="shop-container">
      {/* ----product container--------- */}
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            handleAddToCart={handleAddToCart}
            key={product.id}
          ></Product>
        ))}
      </div>

      {/* ----------Card container ------*/}
      <div className="card-container">
        <Cart cart={cart}>
          <Link to={""}>
            <button className="clear-btn">
              Clear Cart{" "}
              <FontAwesomeIcon
                icon={faTrash}
                style={{ marginLeft: "10px" }}
              ></FontAwesomeIcon>
            </button>
          </Link>
          <Link to={"/order"}>
            <button className="review-btn">
              Review Order{" "}
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                style={{ marginLeft: "10px" }}
              ></FontAwesomeIcon>{" "}
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;

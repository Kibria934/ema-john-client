import React, { Children } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = (props) => {
  const { cart } = props;
  let total = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total += product.price * product.quantity;
    totalShipping += product.shipping;
  }
  const tax = +(total * 0.1).toFixed(3);
  const grandTotal = total + totalShipping + tax;
  return (
    <div className="cart">
      <h2
        style={{
          color: "white",
          textShadow: "2px 1px 3px black",
          letterSpacing: "3px",
        }}
      >
        Your Order Summery
      </h2>
      <p>selected items: {quantity}</p>
      <p>Total Price:${total} </p>
      <p>Total Shipping Price:$ {totalShipping}</p>
      <p>Tax: {tax} </p>
      <h3>Grand Total:$ {grandTotal} </h3>
      <h3>{props.children}</h3>
    </div>
  );
};

export default Cart;

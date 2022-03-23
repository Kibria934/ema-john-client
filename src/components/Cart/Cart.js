import React from 'react';
import './Cart.css'
const Cart = ({ cart }) => {
     console.log(cart);
     let total = 0;
     let totalShipping = 0;
     let quantity = 0;
     for (const product of cart) {
          quantity = quantity + product.quantity;
          console.log(quantity);
          total += (product.price * product.quantity);
          totalShipping += product.shipping;
     }
     const tax = +(total * 0.1).toFixed(3);
     const grandTotal = total + totalShipping + tax;
     return (
          <div className='cart'>
               <h2>This is card container</h2>
               <p>selected items: {quantity}</p>
               <p>Total Price:${total} </p>
               <p>Total Shipping Price:$ { totalShipping}</p>
               <p>Tax: {tax} </p>
               <h3>Grand Total:$ {grandTotal} </h3>
               <button className='clear-btn'>Clear Cart</button><br />
               <button className='review-btn'>Review Cart</button>
          </div>
     );
};

export default Cart;
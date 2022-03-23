import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'


const Shop = () => {
     const [products, setProducts] = useState([]);
     useEffect(() => {
          fetch('products.json')
               .then(res => res.json())
               .then(data =>setProducts(data))
     },[])
     const [cart, setCart] = useState([]);

     const handleAddToCart = (selectedProduct) => {
          let newCart = [];
          const exist = cart.find(product => product.id === selectedProduct.id);
          if (!exist) {
               selectedProduct.quantity = 1;
               newCart = [...cart, selectedProduct];
          } else {
               const rest = cart.filter(product => product.id !== selectedProduct.id);
               exist.quantity += 1;
               newCart = [...rest,exist]
          }

          setCart(newCart);
          addToDb(selectedProduct.id)
     }
     useEffect(() => {
          const storedCart = getStoredCart();
          let savedCart = [];
          for (const id in storedCart) {
               const addedProduct = products.find(product => product.id === id);
               if (addedProduct) {
                    const quantity = storedCart[id];
                   addedProduct.quantity = quantity;
                    savedCart.push(addedProduct)
               }
          }
          setCart(savedCart)
     },[products])
     return (
          <div className='shop-container'>

               {/* ----product container--------- */}
               <div className="products-container">
                    {
                         products.map(product => <Product
                              product={product}
                              handleAddToCart = {handleAddToCart}
                              key={product.id}>
                              </Product>)
                    }
               </div>


               {/* ----------Card container ------*/}
               <div className="card-container">
                   <Cart cart={cart}></Cart>
               </div>
          </div>
     );
};

export default Shop;
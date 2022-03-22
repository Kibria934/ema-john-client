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

     const handleAddToCart = (product) => {
               const newCart = [...cart, product];
          setCart(newCart);
          addToDb(product.id)
     }
     useEffect(() => {
          const storedCart = getStoredCart();
          for (const id in storedCart) {
               const addedProduct = products.find(product => product.id === id);
                                        console.log(id);

               console.log(addedProduct);
          }
     },[])

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
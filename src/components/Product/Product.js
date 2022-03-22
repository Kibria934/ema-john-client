import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const { name, img, ratings, seller, category, price, stock } = props.product;
    return ( 
    <div className = 'product' >
                <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name' > {name}</p>
                <p className='product-price' > Price: ${price} </p>
                <p className='product-seller' > <small>Seller: {seller}</small> </p>
                <p className='product-ratings' > <small>Ratings: {ratings} star</small> </p>
            </div>
            <button onClick={() => props.handleAddToCart(props.product)} className='btn-cart'><p>Add to Cart</p>
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;
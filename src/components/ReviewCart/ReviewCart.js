import React, { Children } from "react";
import "./ReviewCart.css";
import { FiTrash2 } from "react-icons/fi";

const ReviewCart = (props) => {
  const { product, handleRmoveProduct } = props;
  const { name, img, price, shipping, quantity } = product;
  return (
    <div className="review-item-container">
      <div className="review-item-img">
        <img src={img} alt="" />
      </div>
      <div className="review-item-info">
        <div className="review-content">
          <h3 title={name.length < 20 ? " " : name}>
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </h3>
          <p>
            Price:$ <span>{price}</span> <br />
            <span>
              shipping charg:$ <span>{shipping}</span>
            </span>
          </p>
        </div>
        <div>
          <button
            onClick={() => handleRmoveProduct(product)}
            className="delete-container"
          >
            <FiTrash2 className="icons" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCart;

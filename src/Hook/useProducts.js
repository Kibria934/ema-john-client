import { useEffect, useState } from "react";

const useProducts = () => {
  const [cartLoading, setCartLoading] = useState(false);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    setCartLoading(true);
    fetch("https://ema-john-kibria.herokuapp.com/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setCartLoading(false);
      });
  }, []);
  return [products, setProducts, cartLoading];
};
export default useProducts;

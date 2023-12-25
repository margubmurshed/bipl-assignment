import React, { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext(null);

const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const fetchProducts = () => {
        setProductsLoading(true);
        fetch("https://dummyjson.com/products")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data.products);
            setProductsLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
            setProductsLoading(false);
          });
      }
      useEffect(() => {
        fetchProducts()
      }, []);


      const value = {products, productsLoading}
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
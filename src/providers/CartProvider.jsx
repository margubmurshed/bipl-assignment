import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsProvider";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const { products, productsLoading } = useContext(ProductsContext);
    const [cartProducts, setCartProducts] = useState([]);


  useEffect(() => {
    const calculateCartProducts = () => {
      const storedCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      const selectedCartProducts = products.filter((product) =>
        storedCart.find((item) => item.id === product.id)
      );
      console.log(storedCart, selectedCartProducts.map(pd => ({...pd, count: (storedCart.find((item) => item.id === pd.id)).count})))
      return selectedCartProducts.map(pd => ({...pd, count: (storedCart.find((item) => item.id === pd.id)).count}));
    }

    if(!productsLoading){
      const calculatedCartProducts = calculateCartProducts();
    console.log(calculatedCartProducts)
    setCartProducts(calculatedCartProducts)
    }
  },[productsLoading])

  const cartProductsLength = () => {
    return cartProducts.reduce((prev, current) => prev+ current.count,0)
  }

  const addCartProduct = (id, count) => {
    const storedCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const prev = storedCart.find(pd => pd.id === id);
    prev ? prev.count = parseInt(prev.count) + 1 : storedCart.push({id, count}) ;
    localStorage.setItem("cart", JSON.stringify(storedCart));

    const cartProductsClone = [...cartProducts]
    const prevCartProduct = cartProductsClone.find(pd => pd.id === id);
    if(prevCartProduct){
        prevCartProduct.count = parseInt(prevCartProduct.count) + 1
    } else{
        const toBeAddedCartProduct = products.find(pd => pd.id === id);
        toBeAddedCartProduct.count = 1;
        cartProductsClone.push(toBeAddedCartProduct);
    }
    setCartProducts(cartProductsClone);
  };

  const removeCartProduct = (id, count) => {
    let storedCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const prev = storedCart.find(pd => pd.id === id);
    prev.count <= 1 ? storedCart = storedCart.filter(pd => pd.id !== prev.id) : prev.count = parseInt(prev.count) -1;
    localStorage.setItem("cart", JSON.stringify(storedCart));

    let cartProductsClone = [...cartProducts]
    const prevCartProduct = cartProductsClone.find(pd => pd.id === id);
    if(prevCartProduct.count <= 1){
      cartProductsClone = cartProductsClone.filter(pd => pd.id !== prevCartProduct.id)
    } else{
      prevCartProduct.count = parseInt(prevCartProduct.count) - 1
    }
    setCartProducts(cartProductsClone);
  }

  const value = {addCartProduct,removeCartProduct, cartProductsLength,cartProducts};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

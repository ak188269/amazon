"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const useCart = () => {
  return useContext(CartContext);
};
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  // format of element in cart is {productId : 1 , quantity : 3};

 useEffect(()=>{
  let cartInLocalStorage = localStorage.getItem('cart');
  if(cartInLocalStorage) {
    cartInLocalStorage = JSON.parse(cartInLocalStorage);
    setCart(cartInLocalStorage)
  }
 },[]);
  useEffect(() => {
    const size = cart.reduce((quantity, item) => {
      return quantity + parseInt(item.quantity);
    }, 0);
    setCartSize(size);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, cartSize }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export { useCart };

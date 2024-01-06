"use client";
import { getCartSize } from "@/services/cart";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";

const CartContext = createContext(null);
const useCart = () => {
  return useContext(CartContext);
};
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const [subTotal , setSubTotal] = useState(0);
  const {user } = useUser();
  // format of element in cart is {productId : 1 , quantity : 3};

 useEffect(()=>{
 if(!user){
  let cartInLocalStorage = localStorage.getItem('cart');
  if(cartInLocalStorage) {
    cartInLocalStorage = JSON.parse(cartInLocalStorage);
    setCart(cartInLocalStorage)
  }
 }
 },[user]);

 const getPriceAndSizeOfLocalstorage = ()=>{
  const subTotal = cart.reduce((accumulator ,item)=>{
    return   accumulator + item.quantity*item.productId.price*10 ; // price is multiplied by 10 alway this is followed everywhere as price mentioned in data was too less 
  },0)
  const size = cart.reduce((accumulator ,item)=>{
      return   accumulator + item.quantity;
    },0)

    setSubTotal(subTotal);
    setCartSize(size);
   
 }
  useEffect(() => {
    if(!user){
      localStorage.setItem("cart", JSON.stringify(cart));
    getPriceAndSizeOfLocalstorage();
    }
  }, [cart]);

useEffect(()=>{
  const cartSize = async ()=>{
    const [response , error] = await getCartSize();
    const codes = [500 , 502 , 503 , 504]; // network error codes
    if(error && codes.includes(error.statusCode) )
    {
      const [response, error] = await getCartSize();
      if(!error){
        setCartSize(response.data);
      }
      
    }
    else if(!error) setCartSize(response.data);

  }
if(user)
  cartSize();
},[user])

  return (
    <CartContext.Provider value={{ cart, setCart, cartSize , setCartSize , subTotal , setSubTotal}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export { useCart };

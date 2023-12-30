"use client";
import axios from "axios";
import attachInterceptor from "./utils/attachInterceptor";
import fetchData from "./utils/fetchData";
import postData from "./utils/postData";
import deleteData from "./utils/deleteData";
import updateData from "./utils/updateData";

//  this is only used when body is json not form-data
const cartAxios = attachInterceptor( axios.create({
  baseURL: process.env.NEXT_PUBLIC_CART_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials : true,
}));

const addToCart = async (productId , quantity)=>{
  const url = `${process.env.NEXT_PUBLIC_ADD_TO_CART_API}`;
  const body = {productId , quantity};
  return postData(cartAxios , url , body);
}
const getUserCartDetails = async ( )=>{
  const url = process.env.NEXT_PUBLIC_GET_USER_CART_API ;
  return await fetchData( cartAxios , url);
}
const decreaseQuantityOfItem = async (productId ) =>{
  const url = `${process.env.NEXT_PUBLIC_DECREASE_PRODUCT_QUANTITY_API}`;
  return await updateData(cartAxios , url , {productId});
}
const increaseQuantityOfItem = async (productId ) =>{
  const url = `${process.env.NEXT_PUBLIC_INCREASE_PRODUCT_QUANTITY_API}`;
  return await updateData(cartAxios , url , {productId});
}

const deleteItemFromCart = async (productId) =>{
  const url = `${process.env.NEXT_PUBLIC_DELETE_ITEM_FROM_CART_API}/${productId}`;
  return await deleteData(cartAxios , url);
}

const getCartSize = async ()=>{
  const url = `${process.env.NEXT_PUBLIC_GET_CART_SIZE_API}`;
  return await fetchData(cartAxios , url );
}
export {addToCart , getUserCartDetails , increaseQuantityOfItem , decreaseQuantityOfItem , deleteItemFromCart , getCartSize};
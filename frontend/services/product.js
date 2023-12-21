"use client";
import axios from "axios";
import fetchData from "./utils/fetchData";
import attachInterceptor from "./utils/attachInterceptor";


const productAxios = attachInterceptor( axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
}));



const getAllProduct = async (requiredData="") => {
    const url = `${process.env.NEXT_PUBLIC_ALL_PRODUCT_API}/?select=${requiredData}`;
    return await fetchData(productAxios,url);
};

const getProductByCategory = async (category , requiredData="") => {
  const url = process.env.NEXT_PUBLIC_PRODUCT_BY_CATEGORY_API + "/" + category + "/?select=" + requiredData;
  return await fetchData(productAxios,url);
}

const getSingleProduct = async (id , requiredData="") =>{
  const url = `${process.env.NEXT_PUBLIC_SINGLE_PRODUCT_API}/${id}?select=${requiredData}`;
  return await fetchData(productAxios,url);
}


export { getAllProduct ,getProductByCategory  , getSingleProduct};

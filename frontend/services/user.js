"use client";
import axios from "axios";
import attachInterceptor from "./utils/attachInterceptor";
import fetchData from "./utils/fetchData";
import postData from "./utils/postData";

//  this is only used when body is json not form-data
const userAxios = attachInterceptor( axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials :true,
}));

const formDataUserAxios = attachInterceptor( axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_API_BASE_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }));

const register = async (name , email , password)=>{
    const url = `${process.env.NEXT_PUBLIC_USER_REGISTER_API}`;
    const body = {name , email , password };
    return await postData(userAxios , url , body);
}

const login = async (email , password)=>{
    const url = `${process.env.NEXT_PUBLIC_USER_LOGIN_API}`;
    const body = {email , password };
    return await postData(userAxios , url , body);
}

const logout = async () =>{
    const url = `${process.env.NEXT_PUBLIC_USER_LOGOUT_API}`;
    return await fetchData(userAxios , url);
}

const isUserLoggedIn = async () =>{
  const url = `${process.env.NEXT_PUBLIC_IS_USER_LOGGED_IN_API}`;
  return await fetchData(userAxios , url );
}

export { register  , login , logout , isUserLoggedIn};
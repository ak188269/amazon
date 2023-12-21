"use client";
import axios from "axios";
import attachInterceptor from "./utils/attachInterceptor";
import fetchData from "./utils/fetchData";
import postData from "./utils/postData";

//  this is only used when body is json not form-data
const cartAxios = attachInterceptor( axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
}));
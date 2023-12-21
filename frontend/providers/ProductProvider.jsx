"use client"
import { createContext, useContext, useState } from "react";

const productContext = createContext(null);

function useProduct(){
    return  useContext(productContext)
 }
 
 const ProductProvider = ({children})=>{
     const [loading,setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [data,setData] = useState([]);
     return (
 <productContext.Provider value={{loading , data , error , setLoading , setData , setError}}>
     {children}
 </productContext.Provider>
     )
 }
 
 export default ProductProvider ;
 export {useProduct,productContext};
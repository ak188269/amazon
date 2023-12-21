'use client'
import ProductProvider, { useProduct } from '@/providers/ProductProvider';
import React, { useEffect } from 'react'
import {getAllProduct} from "@/services/product";
const page = () => {
  const {loading , data  : product, error , setLoading , setData , setError} = useProduct();
useEffect(()=>{
  
const fun= async ()=>{
  const [data , error] = await getAllProduct();
console.log("response: " , [data , error]);
  if(error){
    setError(error);
  }
  else {
    setData(data.products);
  }
  setLoading(false);
}

fun();
},[]);

  return (
   <>
   <div>Testing</div>
   {
    loading ? <div>Loading .....</div> :
    <div className='flex flex-wrap justify-between'>
    {product.map((item,ind)=>{
      return(
       <div key={ind} className='flex min-w-[200px] flex-col w-[20%] aspect-square border border-red-500'>
        <img src={item.images[0]} alt="" className='w-full aspect-square object-contain'/>
        <div key={ind}>{item.title}</div>
       </div>
      )
    })}
    </div>
   }
   </>
        
    )
  }


export default page;
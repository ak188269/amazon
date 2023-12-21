'use client';
import ProductCard from '@/components/productCard/ProductCard'
import ProductCardSkelton from '@/components/productCard/ProductCardSkelton';
import { getSingleProductById } from '@/services/product';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const {id} = useParams();
    const [product , setProduct] = useState({});
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(true);

    const getSingleProduct = async () =>{
        setLoading(true);
        const [data , error] = await getSingleProductById(id);
        setLoading(false);
        setError(error);
        setProduct(data);
    }
    useEffect(()=>{
        getSingleProduct();
    },[])

  return (
   <>
   {
    loading ? <ProductCardSkelton/>:
    error ? <div className='text-red-400 text-center mt-2'>{error.statusCode === 404 ? "Product does not exit " : "Some error occured please try later !"}</div> :
   <ProductCard product={product}/>
   }
   </>
  )
}

export default page
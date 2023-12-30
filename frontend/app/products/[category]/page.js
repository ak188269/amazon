'use client'
import ProductCard from '@/components/productCard/ProductCard';
import ProductCardSkelton from '@/components/productCard/ProductCardSkelton';
import { getProductByCategory } from '@/services/product';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
        
    const {category} = useParams();

    const [products , setProducts] = useState([]);
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(true);

    const getAllProduct = async()=>{
        setLoading(true);
        const [data , error] = await getProductByCategory(category);
        setLoading(false);
        setError(error);
        setProducts(data?.products || []);
    }

    useEffect(()=>{
        getAllProduct();
    },[])



  return (
    <div className={`flex flex-col gap-4 p-3`}>
        {
            (!loading) ? products.length > 0 ?   products?.map((item,ind)=>{
                    return (
                        <ProductCard product={item} key={ind}/>
                    )
                }) 
                : <div className='text-center text-red-500'>Product is not available</div>
           :    Array.from({length:3}).map((item,ind)=>{
                    return (
                        <ProductCardSkelton key={ind}/>
                    )
                }) 
                
               
        }
    </div>
  )
}

export default page
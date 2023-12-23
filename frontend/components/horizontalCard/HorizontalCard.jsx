"use client"
import React, { useEffect, useState, useRef } from 'react';
import { getProductByCategory } from '@/services/product';
import Link from 'next/link';

const HorizontalCard = ({ category }) => {
  const url = `https://dummyjson.com/products/category/${category}`;
  const [imageLoading , setImageLoading] = useState(true);
  const [loading , setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [error , setError] = useState(false);
  const cardRef = useRef(null);

  const lazyLoadCallback = (entries,observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        console.log("intersecting");
        const [response , error] = await getProductByCategory(category,'images,title');
        setLoading(false);
        if(error){
          setError(true);
          return;
        }
        setProduct(response.products);
        observer.unobserve(entry.target);
      }
    });
  };


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the component is in view
    };

    const observer = new IntersectionObserver(lazyLoadCallback, options);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
  
     <div ref={cardRef} className={`bg-white p-2 flex flex-col gap-3 mx-auto w-full sm:w-[95%] md:w-full xl:w-[1200px]`}>

   {
    loading ?    (
      <>
      <h1 className='text-2xl font-bold w-[200px] bg-[#dfdddd] h-[20px] animate-pulse rounded'></h1>
      <div className={`flex gap-4 flex-wrap mt-1 md:mt-0 lg:justify-between`}>
        {[1,2,3,4,5].map((item, ind) => (
          <div key={ind} className={`flex flex-col border-0  items-center w-[29%] md:w-[18%] md:justify-between  bg-[#cecdcd] rounded relative`} style={{ aspectRatio: "1.3" }}>
            
            <div className={` h-full   top-0 w-full  absolute shimmer-effect`} ></div>
          </div>
        
        ))}
      </div>
      </>
    ) : 
    error ? <div className='text-red-500 text-sm'>Oops ! Error getting data 😓</div> :
    (
      <>
      <h1 className='text-2xl font-bold'>Best seller in {category}</h1>
      <div className={`flex gap-4 flex-wrap mt-1 md:mt-0 lg:justify-between`}>
        {product.map((item, ind) => (
          <Link href={`/product/${item.id}`} key={ind} className={`flex flex-col border-0  items-center w-[29%] md:w-[18%] md:justify-between `} style={{ aspectRatio: ".9" }}>
            <img src={item.images[0]} alt={item.title} className={`w-full h-full hover:scale-110 transition-all cursor-pointer ${imageLoading ? 'blur-sm bg-loading' : 'filter-none'} border-0 border-red-500 `} loading='lazy' style={{ objectFit: "contain" }} onLoad={()=>{
              setImageLoading(false)
            }}/>
            <span className='text-xs md:hidden'>{item.title }</span>
          </Link>
        ))}
      </div>
      </>
    )
   }
  </div>
  
  );
};

export default HorizontalCard;

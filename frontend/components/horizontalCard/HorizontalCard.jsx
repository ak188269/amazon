"use client"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const HorizontalCard = ({ category }) => {
  const [loading , setLoading] = useState(true);
  const [imageLoading , setImageLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const cardRef = useRef(null);

  const getProductByCategory = async () => {
    try {
      const url = `https://dummyjson.com/products/category/${category}`;
      const { data } = await axios.get(url);
      setProduct(data.products);
        setLoading(false)

    } catch (err) {
      console.error("Error getting product by category ", err.message);
    }
  };

  const lazyLoadCallback = (entries,observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Perform actions (e.g., API call) when the component is in view
        getProductByCategory();
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
  
     <div ref={cardRef} className={`bg-white p-2 flex flex-col gap-3 `}>

   {
    loading ?    (
      <>
      <h1 className='text-2xl font-bold w-[200px] bg-[#dfdddd] h-[20px] animate-pulse rounded'></h1>
      <div className={`flex gap-3 justify-between`}>
        {[1,2,3,4].map((item, ind) => (
          <div key={ind} className={`flex  items-center w-[23%] min-w-[200px]  bg-[#cecdcd] rounded relative`} style={{ aspectRatio: "1.3" }}>
            
            <div className={` h-full   top-0 w-full  absolute shimmer-effect`} ></div>
          </div>
        
        ))}
      </div>
      </>
    ) : 
    (
      <>
      <h1 className='text-2xl font-bold'>Best seller in {category}</h1>
      <div className={`flex gap-3 justify-between`}>
        {product.map((item, ind) => (
          <div key={ind} className={`flex justify-center items-center w-44 min-w-[200px]`} style={{ aspectRatio: ".9" }}>
            <img src={item.images[0]} alt={item.title} className={`w-full h-full hover:scale-110 transition-all cursor-pointer ${imageLoading ? 'blur-sm' : 'filter-none'}`} loading='lazy' style={{ objectFit: "contain" }} onLoad={()=>{
              setImageLoading(false)
            }}/>
          </div>
        
        ))}
      </div>
      </>
    )
   }
  </div>
  
  );
};

export default HorizontalCard;

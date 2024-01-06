import Link from 'next/link';
import React from 'react'

const page  = () => {
  return (
    <>
    
    <div className='flex flex-col justify-center items-center gap-3 mt-[10px]'>
        <img src="/images/order/order_failed.gif" alt="" className='w-1/3 rounded-3xl'/>
        
        <div className='font-semibold text-red-600'>Order Failed try again</div>
        <Link href={"/"} className='text-[#5050d8] underline'> Go to home</Link>
        <Link href={"/cart"} className='text-[#5050d8] underline'> Go to cart</Link>
    </div>
    </>
  )
}

export default page;
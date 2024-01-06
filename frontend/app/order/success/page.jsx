import Link from 'next/link';
import React from 'react'

const page  = () => {
  return (
    <>
    
    <div className='flex flex-col justify-center items-center gap-3 mt-[90px] lg:mt-[10px]'>
        {/* <img src="/images/order/order_failed.gif" alt="" className='w-1/4 rounded-3xl'/> */}
        <img src="/images/order/order_success.webp" alt="" className='w-1/4 rounded-3xl'/>
        <div className='font-semibold'>Order placed successfully</div>
        <Link href={"/"} className='text-[#5050d8] underline'> Go to home</Link>
      
    </div>
    </>
  )
}

export default page;
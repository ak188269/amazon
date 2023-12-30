'use client'
import { useCart } from '@/providers/CartProvider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cart = () => {
  const {cartSize} = useCart();
  return (
    <>
    <Link href={"/cart"} className={`flex cursor_pointer`}>
    <div className='relative  md:w-full md:h-full'>
        <span className={`text-[#D18324] absolute left-2 bottom-4 text-xs lg:left-4 lg:bottom-5 font-semibold  min-w-[20px] text-center`}>{cartSize}</span>
    <div className={`icon_container w-[2rem] lg:w-full`}>
         <Image
           src={"/images/navbar/cart.svg"}
           width={18}
           height={18}
           className={`icons`}
           alt="cart icon"
         />
       </div>
       {/* ------- cart wheel ---------- */}
       <div className={`flex gap-1 justify-center lg:gap-2 p-1`}>
       <div className={`icon_container w-[.3rem] ml-1 lg:ml-2 lg:w-full`}>
         <Image
           src={"/images/navbar/cart_wheel.svg"}
           width={18}
           height={18}
           className={`icons`}
           alt="wheel icon"
         />
       </div>
       <div className={`icon_container w-[.3rem] ml-0 lg:ml-2 lg:w-full`}>
         <Image
           src={"/images/navbar/cart_wheel.svg"}
           width={18}
           height={18}
           className={`icons`}
           alt="wheel icon"
         />
       </div>
       </div>
    </div>

    <div className={`text-white mt-2 lg:mt-3 text-xs lg:text-[1rem] font-semibold`}>
        Cart
    </div>
    </Link>
    </>
  )
}

export default Cart
import Image from 'next/image'
import React from 'react'

const Cart = ({number}) => {
  return (
    <>
    <div className={`flex cursor_pointer`}>
    <div className='relative'>
        <span className={`text-[#D18324] absolute left-4 bottom-5 font-semibold  min-w-[20px] text-center`}>{number}</span>
    <div className={`icon_container`}>
         <Image
           src={"/images/navbar/cart.svg"}
           width={18}
           height={18}
           className={`icons`}
           alt="location icon"
         />
       </div>
       {/* ------- cart wheel ---------- */}
       <div className={`flex justify-center gap-2 p-1`}>
       <div className={`icon_container ml-2`}>
         <Image
           src={"/images/navbar/cart_wheel.svg"}
           width={18}
           height={18}
           className={`icons`}
           alt="location icon"
         />
       </div>
       <div className={`icon_container`}>
         <Image
           src={"/images/navbar/cart_wheel.svg"}
           width={18}
           height={18}
           className={`icons`}
           alt="location icon"
         />
       </div>
       </div>
    </div>

    <div className={`text-white mt-3 text-sm font-semibold`}>
        Cart
    </div>
    </div>
    </>
  )
}

export default Cart
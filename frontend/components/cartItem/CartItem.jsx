'use client'
import useToast from '@/hooks/useToast';
import { useCart } from '@/providers/CartProvider';
import { useUser } from '@/providers/UserProvider';
import { deleteItemFromCart } from '@/services/cart';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

const CartItem = ({item }) => {
  // console.log("id : ",item.productId);
  const [product , setProduct] = useState(item?.productId);
  const [quantity , setQuantity] = useState(item?.quantity);
  const {cart , setCart , setCartSize , setSubTotal} = useCart();
  const {user} = useUser();
  const notify = useToast();

  const deleteItem = async ()=>{
    // setCartSize((size)=>size - quantity);
    if(user){
      const[response , error] = await deleteItemFromCart(product.id);
    if(error) {
    notify("Error deleting from cart try later",'error');
    return 
    }
    const { items , size , subTotal} = response.data;
    setCart(items);
    setSubTotal(subTotal);
    setCartSize(size);
    }
    else {
      const newCart = cart.filter((item)=> item.productId.id.toString() !== product.id.toString());
      setCart(newCart);
    }
    notify("Removed from cart",'success');
  }
 

  return (
    <div className={`flex gap-3  bg-[#F7F9FA] p-3 flex-grow`} >
    {/* ------ left part ( product image and quanity controller) -------- */}

<Link href={`/product/${product.id}`} className='flex flex-col gap-2   w-[160px] md:w-[190px] lg:w-[200px] xl:w-[210px]'>


<img src={product?.images?.[0]} alt={product?.title} className={`w-full object-contain`}/>



</Link>

{/* ------ description of product -------- */}
<div className='flex flex-col gap-2 w-[70%]'>
  <Link href={`/product/${product.id}`} className='text-xl'>{product?.title}</Link>
  <span className='text-lg font-semibold'>₹{parseInt(10*product?.price)}</span>
  <span className='text-sm'>Eligible for FREE Shipping</span>
  <span className='hidden md:block'>{product?.description}</span>
  <span className='text-[green] text-xs'>In stock</span>
  {/* --------- quantity controller ----- */}

{/* <select name="" id="" defaultValue={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))}>
  {
    Array.from({length:10}).map((_,ind)=>{
      return (
        <option value={ind+1} key={ind}>{ind+1}</option>
      )
    })
  }
</select> */}
<div className='flex gap-3 items-center'>
<span className='text-sm'>Quantity : {item?.quantity}</span>
  <button className='rounded-md text-sm border border-[#a5a3a3] w-max min-w-[100px] md:min-w-[150px] p-1' onClick={deleteItem}>Delete</button>
</div>
</div>
  </div>
    
  )
}

export default CartItem;
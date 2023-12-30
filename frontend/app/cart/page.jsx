'use client';
import CartItem from '@/components/cartItem/CartItem';
import useToast from '@/hooks/useToast';
import { useCart } from '@/providers/CartProvider';
import { useUser } from '@/providers/UserProvider';
import { getUserCartDetails } from '@/services/cart';
import React, { useEffect, useMemo ,useState} from 'react'

const page = () => {

    const {cart , setCart ,cartSize , subTotal , setSubTotal} = useCart();
  
    const {user} = useUser();
    const notify = useToast();
    const getUserCart = async ()=>{
        const [response , error ] = await getUserCartDetails();
        if(error){
            notify("Error getting cart try later !",'error');
            return;
        }
        console.log("cart " ,response.data);
        setCart(response.data.items);
        setSubTotal(response.data.subTotal)
        
    }
  
    useEffect(()=>{
      if(user)
      getUserCart();
   
    },[user]);



  const requiredSubtotal = useMemo(()=>549,[]);

  return (
<>
{
  cartSize > 0 ?   <div className='flex flex-col-reverse lg:flex-row gap-3'>
  
    {/* ------------ showing all the items in cart ----------------- */}
<div className={`flex flex-col gap-2 mt-2 lg:w-[80%] border-0 border-black`}>
    {
      cart?.map((item,ind)=>{
    return <CartItem item={item} setSubTotal={setSubTotal} key={item.productId._id || item.productId.id}/>
      })
    }
    </div>

     {/* ---------- subtotal and proceed to checkout---- */}
     <div className={`flex flex-col gap-2 p-2 bg-[#F7F9FA] min-w-[200px] lg:pt-3 lg:w-[20%]`}>
      <span className='text-xl lg:text-sm flex gap-1'>Subtotal <span className='hidden lg:block'>({cartSize} item)</span> : <span className={`font-semibold`}>₹{subTotal}</span></span>
       <button className={`px-5 py-2 rounded-lg bg-[#FFD814] hover:bg-[#e8c30f] text-sm`}>Proceed to Buy <span className='lg:hidden'>( {cartSize} item )</span></button>
    </div>

</div>

: 
<div className='text-center text-xl mt-5'>Cart is empty 🐒 </div>
}
</>
  )
}

export default page
'use client'
import React, { useState } from 'react'
import styles from "../register/register.module.css"
import Link from 'next/link'
import useToast from '@/hooks/useToast'
import { login } from '@/services/user'
import { useUser } from '@/providers/UserProvider'
import { useRouter, useSearchParams } from 'next/navigation'
const page = () => {
    const [details , setDetails] = useState({email:"",password:""});
    const notify = useToast();
    const {setUser} = useUser();
    const returnUrl = useSearchParams().get('returnUrl');
    const router = useRouter();
    const handleChange = (e)=>{
        setDetails((details) => {
            return {
                ...details
                , [e.target.name] : e.target.value
            }
        } );
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const {email , password} = details;
     const [response , error] = await login( email , password);
    if(error) {
        notify(error.message,"error");
        return;
    }
    
    setUser(response.data);
    notify(response.message,"success");

    if(returnUrl) 
    router.replace(returnUrl);
    else router.replace("/");

    }
  return (
    <div className={`flex flex-col items-center p-3  pt-4 gap-3  justify-center`}>
        <div className='w-[60%] lg:w-[40%] max-w-[350px] flex flex-col items-center gap-4  min-w-[310px]'>
        {/* ------- Logo part --------- */}
          <Link href={"/"} className="flex justify-center">
          <span className={`${styles.amazon_logo}`}>
            {/* ------- in this background image of amazon will be added ----------- */}
          </span>
          <span className="mb-2">.in</span>
        </Link>

    {/* --------- form part ---------- */}
    <form onSubmit={handleLogin} onChange={handleChange} className={`p-4 border-[1.5px] flex flex-col gap-3  w-full  rounded-lg`}>
    <h1 className='text-2xl font-[600]'>Sign in</h1>

  

    <div className={`flex flex-col gap-1 text-sm`}>
        <label htmlFor="email" className='font-semibold text-xs'>Email</label>
        <input  type="text" name='email' id='email' placeholder='Valid email' className={`p-1 px-2 outline-none border border-[#787878] rounded`} />
    </div> 

   
    
    <div className={`flex flex-col gap-1 text-sm`}>
        <label htmlFor="password" className='font-semibold text-xs'>Password</label>
        <input  type="password" name="password" id="password" placeholder='At least 6 characters'  className={`p-1 px-2 outline-none border border-[#787878] rounded`}/>
    </div>
 
    <span className='text-xs'>By continuing, you agree to Amazon's <span className='text-[#3bace0]'>Conditions of Use</span> and <span className='text-[#3bace0]'>Privacy Notice</span>.</span>
    <button className={`bg-[#FFD814] p-2 rounded-lg text-sm mt-1`}>Sign in</button>

   
    </form>

    <span className='text-[#a4a2a2] flex text-sm mt-3 w-full items-center gap-1'> <span className='h-[.5px] flex-grow bg-[#e1e1e1]'></span> New to amazon? <span className='h-[.5px]  flex-grow bg-[#e1e1e1]'></span></span>
    {/* <button className='rounded-lg text-sm border-[#dad7d7] border p-1 px-5 w-full'>Create your amazon account</button> */}
    <Link href="/register" className={'rounded-lg text-sm border-[#c9c8c8] border p-1 px-5 w-full text-center'}> Create your amazon account</Link>
    </div>
    </div>
  )
}

export default page
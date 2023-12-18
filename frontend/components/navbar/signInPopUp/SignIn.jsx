import React from 'react'
import styles from "./signin.module.css"
import Link from 'next/link'
export const SignIn = () => {
  return (
   <>
    {/* --------- sign in pop on hover --------- */}
    <div className="bg-white flex-col gap-2 p-3 text-xs items-center rounded-sm  mt-5 absolute top-[30px] left-[-15px] border hidden z-10" id='signin-popup' style={{minWidth:"max-content"}}>
        <div className={`${styles.triangle} w-[20px] h-[10px]  absolute top-[-10px] bg-white`} >

        </div>
        <button className={`bg-[#FFD814] px-7 py-2 rounded font-semibold text-black`}>Sign in</button>
        <span className="text-xs text-[#333333]">
          New customer?
          <Link href={"/login"} className="text-[#0066c0] font-semibold">
           &nbsp; Start here 
          </Link>
        </span>
       </div>
   </>
  )
}

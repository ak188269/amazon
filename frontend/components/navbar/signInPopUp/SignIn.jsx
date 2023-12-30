import React from 'react'
import styles from "./signin.module.css"
import Link from 'next/link'
import { useUser } from '@/providers/UserProvider'
import { usePathname , useRouter, useSearchParams } from 'next/navigation'
import { logout } from '@/services/user'
import useToast from '@/hooks/useToast'
const SignIn = () => {
  const {user , setUser} = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const query = useSearchParams().toString();
  let returnUrl = pathName + query;
  if(pathName =="/login"){
    if(query){
      returnUrl = query.split("returnUrl=")[1];

    }
  }
  const notify = useToast();

  const handleLogout = async()=>{
    const [response , error] = await logout();
    if(error){
      notify(error.message , "error");
      return;
    }
    notify(response.message , "success");
    setUser(null);
    router.push("/");
  }
  return (
   <>
    {/* --------- sign in pop on hover --------- */}
    <div className="bg-white flex-col gap-2 p-3 text-xs items-center rounded-sm  mt-5 absolute top-[35px] left-[-15px] border hidden z-10" id='signin-popup' style={{minWidth:"max-content"}}>
        <div className={`${styles.triangle} w-[20px] h-[10px]  absolute top-[-10px] bg-white`} >

        </div>
     { !user ?   <Link href={`/login/?returnUrl=${returnUrl}`} className={`bg-[#FFD814] px-7 py-2 rounded font-semibold text-black`}>Sign in</Link>
     :  <button className={`bg-[#FFD814] px-7 py-2 rounded font-semibold text-black`} onClick={handleLogout}>Log out</button>
    }
       {!user && <span className="text-xs text-[#333333]">
          New customer?
          <Link href={`/register/?returnUrl=${returnUrl}`} className="text-[#0066c0] font-semibold">
           &nbsp; Start here 
          </Link>
        </span>}
       </div>
   </>
  )
}

export default SignIn;
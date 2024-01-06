'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./mobileNavbar.module.css";
import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";
import Cart from "../cart/Cart";
import { useUser } from "@/providers/UserProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Sidebar } from 'primereact/sidebar';
import useToast from "@/hooks/useToast";
import { logout } from "@/services/user";
        
const MobileNavbar = () => {
  const query = useSearchParams().toString();
  const pathName = usePathname();
  let returnUrl = pathName + query;
  if(pathName =="/login"){
    if(query){
      returnUrl = query.split("returnUrl=")[1];

    }
  }
  const {user , setUser} = useUser();
  // const user = "Someone";
  const address = "Mumbai 400001";

  const [visible, setVisible] = useState(false);
  const notify = useToast();
  const router = useRouter();
const openSidebar =(e)=>{
  if(!user)
  return;
e.preventDefault();
setVisible(true)
}
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
    <nav className="bg-[#131921] p-2 flex  lg:hidden flex-col  gap-2  sticky  z-10 top-0">

{/* --------upper part ------------------- */}
<div className="flex justify-between w-full items-center px-1">
    {/* ----------amazon logo --------- */}
    <Link href={"/"} className="flex gap-0 cursor-pointer w-[30%] h-[1.5rem] border-0 border-red-500">
    {/* <Image
            src={"/images/category_navbar/hamburger.svg"}
            width={20}
            height={15}
            alt="hamburger"
            className="icons"
            style={{ width: "auto", height: "70%" }}
          /> */}
      <span className={`${styles.amazon_logo} ml-2 mt-1`}>
        {/* ------- in this background image of amazon will be added ----------- */}
      </span>
      <span className="text-white text-sm">.in</span>
    </Link>
  {/* </div> */}

{/* -------- delivery part ----------- */}
  <div className="hidden flex-col text-white cursor_pointer">
    <span className={`ml-2 text-[#C9CCCC] text-sm`} style={{}}>Deliver to {user?.name || 'user'}</span>

    <span className={`flex`}>
      <div className={`icon_container`}>
        <Image
          src={"/images/navbar/location.svg"}
          width={18}
          height={18}
          className={`icons`}
          alt="location icon"
        />
      </div>
   <span className="text-white text-sm font-semibold">
   {address}
   </span>
    </span>
  </div>


{/* -- right part ---------- */}
<div id="right-part" className="flex gap-3 items-center">
  {/* --------- account and sign in -------- */}
  
  <Link href={!user ? `/login?returnUrl=${returnUrl}`: "#"} onClick={openSidebar} className="flex text-white cursor_pointer gap-1 mb-1" id="account-and-sign-in">
    <span className={`ml-2`} style={{}}>{user?.name || "Sign in"} </span>

     
   
   <div className={`icon_container`}>
        <Image
          src={"/icons/mobileNavbar/user_logo.svg"}
          width={18}
          height={18}
          className={`icons`}
          alt="user icon"
        />
      </div>


   </Link>


   {/* --------- cart --------------- */}
   <Cart number={0}/>

   </div>
   </div>
    {/* -------- search bar ---------- */}
   <SearchBar/>

{/* side bar for logout--------------- */}
    <Sidebar visible={visible} onHide={() => setVisible(false)} className="" position="right">
    <button className={`bg-[#FFD814] px-7 py-2 rounded font-semibold text-black  transform translate-x-[-50%] relative left-[50%] top-2`} onClick={handleLogout}>Log out</button>
   
    </Sidebar>
</nav>
  )
}

export default MobileNavbar
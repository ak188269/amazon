import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import SearchBar from "./searchBar/SearchBar";
import Cart from "./cart/Cart";
import { SignIn } from "./signInPopUp/SignIn";
const Navbar = () => {
  const user = "Someone";
  const address = "Mumbai 400001";
  return (
    <nav className="bg-[#131921] p-3 flex gap-x-6 items-center">

        {/* ----------amazon logo --------- */}
      <div className="cursor_pointer">
        <Link href={"/"} className="flex justify-center">
          <span className={`${styles.amazon_logo}`}>
            {/* ------- in this background image of amazon will be added ----------- */}
          </span>
          <span className="text-white mb-2">.in</span>
        </Link>
      </div>

{/* -------- delivery part ----------- */}
      <div className="flex flex-col text-white cursor_pointer">
        <span className={`ml-2 text-[#C9CCCC] text-sm`} style={{}}>Deliver to {user}</span>

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

      {/* -------- search bar ---------- */}
      <SearchBar />

      {/* --------- account and sign in -------- */}
      
      <div className="flex flex-col text-white cursor_pointer relative" id="account-and-sign-in">
        <span className={`ml-2 text-sm`} style={{}}>Hello, { "sign in"}</span>

        <span className={`flex items-center gap-1`}>
         
       <span className="text-white text-sm font-semibold">
        Accounts & Lists 
       </span>
       <div className={`icon_container`}>
            <Image
              src={"/images/navbar/select_arrow.svg"}
              width={18}
              height={18}
              className={`icons`}
              alt="location icon"
            />
          </div>
        </span>

{/* -------- hover page for sign in------- */}
        <SignIn/>

       </div>
      

       {/* --------- return and orders */}
       <div className={`flex flex-col text-white cursor_pointer`}>
        <span className={`text-xs`}>
          Returns
        </span>
        <span className={`font-semibold text-sm`}>
          & Orders
        </span>
       </div>

       {/* --------- cart --------------- */}
       <Cart number={0}/>
    </nav>
  );
};

export default Navbar;

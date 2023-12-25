import Image from "next/image";
import React from "react";
import styles from "./category_navbar.module.css";
import Link from "next/link";
const CategoryNavbar = () => {
  const Menu = [
  
    { navigate_to: "/products/smartphones", name: "Mobiles" ,thumbnail_url: "/images/category_navbar/mobile.jpg" },
    { navigate_to: "/products/laptops", name: "Laptops" ,thumbnail_url: "/images/category_navbar/laptop.webp"},
    { navigate_to: "/products/mens-shirts", name: "Fashion" ,thumbnail_url: "/images/category_navbar/fashion.jpg"},
    { navigate_to: "/products/skincare", name: "Beauty" ,thumbnail_url: "/images/category_navbar/beauty.jfif"},
    { navigate_to: "/products/lighting", name: "Electronics",thumbnail_url: "/images/category_navbar/electronics.jpg" , notInMobile : false},
    { navigate_to: "/products/womens-jewellery", name: "Jewelleries" , notInMobile : false },
    { navigate_to: "/products/groceries", name: "Grocery",thumbnail_url: "/images/category_navbar/grocery.jpg" },
    { navigate_to: "/#", name: "Amazon Pay" ,thumbnail_url: "/images/category_navbar/amazon_pay.jfif"},
  ];


  return (
    <>
      <div className={`hidden lg:flex bg-[#232F3E] p-0  gap-3  items-center `}>
        <div
          className={`flex items-center gap-1 ${styles.category_menu_items} text-sm`}
        >
          <Image
            src={"/images/category_navbar/hamburger.svg"}
            width={20}
            height={20}
            alt="hamburger"
            className="icons"
            style={{ width: "auto", height: "auto" }}
          />
          <span className="text-white">All</span>
        </div>

        {Menu.map((item, ind) => {
          return (
            <Link
              href={item.navigate_to}
              className={`text-white text-sm ${styles.category_menu_items}`}
              key={ind}
            >
              {item.name}
            </Link>
          );
        })}

        <div className="ml-auto cursor-pointer">
          <Image
            src={"/images/category_navbar/shoping_made_easy.jpg"}
            width={450}
            height={20}
            alt="shoping made easy"
            style={{ height: "auto" }}
          />
        </div>
      </div>

      {/* ---------- for smaller device width < 1024 px-------- */}
      <div className={`flex lg:hidden gap-2 overflow-x-auto ${styles.scrollbar_none} bg-white`}>
        {
            Menu.map((item, ind) => {
              /// this is done because i was not having image of jwellery section if got it later then remove this if 
              if(item.name !== "Jewelleries"){
              return (
                <Link
                  href={item.navigate_to}
                  className={`flex flex-col gap-1 h-fit p-2 border`}
                  key={ind}
                >
                 <div className={`h-[3rem]`}>
                  <img src={item.thumbnail_url} alt={item.name} className={`w-full h-full object-contain`} />
                 </div>
                 <span className="text-xs md:text-sm">{item.name}</span>
                </Link>
              );
              }
            })
          
          
        }
      </div>
    </>
  );
};

export default CategoryNavbar;

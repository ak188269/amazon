import Image from "next/image";
import React from "react";
import styles from "./category_navbar.module.css";
import Link from "next/link";
const CategoryNavbar = () => {
  const Menu = [
  
    { navigate_to: "/products/smartphones", name: "Mobiles" },
    { navigate_to: "/products/laptops", name: "Laptops" },
    { navigate_to: "/products/mens-shirts", name: "Fashion" },
    { navigate_to: "/products/skincare", name: "Beauty" },
    { navigate_to: "/products/lighting", name: "Electronics" },
    { navigate_to: "/products/womens-jewellery", name: "Jewelleries" },
    { navigate_to: "/products/groceries", name: "Kitchen" },
    { navigate_to: "/#", name: "Amazon Pay" },
  ];

  return (
    <>
      <div className={`bg-[#232F3E] p-0 flex gap-3  items-center`}>
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
    </>
  );
};

export default CategoryNavbar;

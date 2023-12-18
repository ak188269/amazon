import Image from 'next/image'
import React from 'react'
import styles from "./category_navbar.module.css"
const CategoryNavbar = () => {
    const Menu = ["Best Sellers", "Mobiles", "Fashion", "Beauty","Electronics","Books","Kitchen","Amazon Pay"]
  return (
    <>
    <div className={`bg-[#232F3E] p-0 flex gap-3  items-center`}>
        <div className={`flex items-center gap-1 ${styles.category_menu_items} text-sm`}>
            <Image src={'/images/category_navbar/hamburger.svg'}
            width={20}
            height={20}
            alt="hamburger"
            className='icons'
            style={{width:"auto", height:"auto"}}
            />
            <span className='text-white'>
                All
            </span>
        </div>

{
    Menu.map((item,ind)=>{
        return(
            <div className={`text-white text-sm ${styles.category_menu_items}`} key={ind}>
                {item}
            </div>
        )
    })
}

<div className='ml-auto cursor-pointer'>
    <Image
    src={"/images/category_navbar/shoping_made_easy.jpg"}
    width={400}
    height={20}
    // style={{width:"100%"}}
    />
</div>
    </div>

    </>
  )
}

export default CategoryNavbar
import React from 'react'
import styles from "./productCard.module.css"
const ProductCard = () => {
  return (
   <>
   <div className={`flex gap-3 justify-between`}>
    {/* --------- left part containing product images ------------*/}
    <div>
        <div>
            <img src="https://i.dummyjson.com/data/products/2/thumbnail.jpg" alt="" />
        </div>
    </div>

    {/* ------------ right side or bottom part  product detail part -------------- */}
    <div></div>
   </div>
   </>
  )
}

export default ProductCard
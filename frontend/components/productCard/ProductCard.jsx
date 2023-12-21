"use client";
import React, { useMemo, useState } from "react";
import styles from "./productCard.module.css";
import Rating from "../rating/Rating";

const getDiscountedPrice = (originalPrice, discountPercentage) => {
  const discount = (discountPercentage * originalPrice) / 100;
  const discountedPrice = originalPrice - discount;
  return Math.round(discountedPrice);
};

const ProductCard = ({ product }) => {
  const discountedPrice = getDiscountedPrice(
    product?.price * 10,
    product?.discountPercentage
  );

  const [imageLoading, setImageLoading] = useState(true);

  return (
    <>
      <div className={`flex gap-10 bg-white  p-3 px-5`}>
        {/* --------- left part containing product images ------------*/}
        {!imageLoading ? (
          <div>
            <div className="min-w-[250px] max-w-[350px] aspect-square ">
              <img
                src={product?.images?.[0]}
                alt="product"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="min-w-[30%] max-w-[350px] aspect-square bg-[#cecdcd] rounded">
            <div className="shimmer-effect w-full h-full"></div>
            <img
              src={product?.images?.[0]}
              alt="product"
              loading="lazy"
              onLoad={() => setImageLoading(false)}
            />
          </div>
        )}

        {/* ------------ right side or bottom part  product detail part -------------- */}
        <div className={`flex flex-col gap-4 `}>
          <span className={`text-3xl`}>{product?.title}</span>

          <span className="text-[#1e8999]">Brand : {product?.brand}</span>

          {/* ---------- rating part ---------------- */}
          <Rating productRating={parseFloat(product?.rating)} />

          {/* --------- product description------------------*/}
          <span className="lg:max-w-[70%]">{product?.description}</span>

          {/* -------------- price and discounted price------------- */}
          <span className="flex gap-2 items-center">
            <span className=" text-2xl">₹{discountedPrice}</span>

            <span className="line-through text-gray-400">
              {" "}
              ₹{product?.price * 10}
            </span>
            <span className="text-red-600 text-lg">
              - {product?.discountPercentage}%{" "}
            </span>
          </span>

          {/* ---------- emi ------- */}
          <span>Inclusive of all taxes</span>
          <span>
            EMI starts at ₹{~~(discountedPrice / 10)}. No Cost EMI available
          </span>

          {+product?.stock == 0 ? (
            <span className="text-red-600 text-3xl">Out of stock</span>
          ) : (
            <span>Total stocks : {product?.stock}</span>
          )}

          {/* ----------- add to cart and buy now button ------ */}

          <div className="flex gap-6">
            <button className="px-5 py-2 rounded-md bg-[#FFD814] hover:bg-[#e8c30f]">
              Add to Cart
            </button>
            <button className="px-5 py-2 rounded-md bg-[#FA8900] hover:bg-[#c4700a]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

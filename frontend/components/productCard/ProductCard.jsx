"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./productCard.module.css";
import Rating from "../rating/Rating";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import useToast from "@/hooks/useToast";
import { useUser } from "@/providers/UserProvider";
import { addToCart } from "@/services/cart";

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

  const { id } = useParams();
    const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const { cart, setCart, setCartSize } = useCart();
  const { user } = useUser();
  const notify = useToast();
  const getDeliveryDate = () => {
    const currentDate = new Date();

    const options = { weekday: "long", day: "numeric", month: "long" };
    // setting date 2 days ahead from today
    currentDate.setDate(currentDate.getDate() + 2);

    const formattedDate = currentDate.toLocaleDateString("en-IN", options);

    return formattedDate;
  };
  const addItemToCart = useCallback(async (url) => {
    // this url will tell whether it is add to cart or buy now 
    if (user) {
      // setCartSize((size) => size + 1);
      const [response, error] = await addToCart(id, quantity);
      
      if (error) {
        notify("Error adding product try again", error.message ??  error);
        return;
      }
      else{
        setCartSize(response.data.cartSize);
      }
    } else if (!user) {
      const item = { productId: product, quantity: parseInt(quantity) };
      
      setCart((cart) => {
        // ------- productId is converted to string otherwise they will not match ---------
        const productIndex = cart.findIndex(
          (item) => item.productId.id.toString() === product.id.toString()
        );
        const tempCart = [...cart];
        if (productIndex !== -1) {
          tempCart[productIndex].quantity += parseInt(quantity);
        } else tempCart.unshift(item);
        
        return tempCart;
      });
    }
    // setCartSize((size) => size + parseInt(quantity));
    notify("Added to cart", "success");
    if(url && typeof url === "string")
    router.push(url);
  });

  return (
    <>
      {/* <Toaster/> */}
      <div
        className={`flex flex-col mx-auto gap-6  bg-white  p-3 px-5  ${
          id && "lg:justify-around"
        } xs:w-[80%] md:w-full md:flex-row xl:w-[1240px]`}
      >
        {/* --------- left part containing product images ------------*/}
        {!imageLoading ? (
          <Link
            className="w-full aspect-[1.2] md:w-[35%] lg:w-[30%] border-0 xs:border-red-500  "
            href={id ? product?.images?.[0] : `/product/${product?.id}`}
          >
            <img
              src={product?.images?.[0]}
              alt="product"
              loading="lazy"
              className="object-contain w-full"
            />
          </Link>
        ) : (
          <div className="min-w-[30%] max-w-[350px] aspect-square bg-[#cecdcd] rounded">
            <div className="shimmer-effect w-full h-full">
              <img
                src={product?.images?.[0]}
                alt="product"
                loading="lazy"
                onLoad={() => setImageLoading(false)}
              />
            </div>
          </div>
        )}

        {/* ------------ right side or bottom part  product detail part -------------- */}
        <div
          className={`flex flex-col w-full md:w-[45%] lg:w-[45%] gap-3 lg:${
            id && "w-1/3"
          }  `}
        >
          <Link
            className="text-2xl md:max-lg:text-xl  lg:text-3xl"
            href={id ? "#" : `/product/${product?.id}`}
          >
            {product?.title}
          </Link>

          <span className="text-[#1e8999]">Brand : {product?.brand}</span>

          {/* ---------- rating part ---------------- */}
          <Rating productRating={parseFloat(product?.rating)} />

          {/* ------- stock details ------------ */}
          {+product?.stock == 0 ? (
            <span className="text-red-600 text-3xl">Out of stock</span>
          ) : (
            <span className="text-green-700 text-lg">In stock</span>
          )}
          {/* --------- product description------------------*/}
          <span className="  lg:max-w-[100%]">{product?.description}</span>

          {/* -------------- price and discounted price------------- */}
          <span className="flex gap-2 items-center">
            <span className=" text-2xl">₹{(parseFloat(product?.price) * 10).toFixed(2)}</span>

            {/* <span className="line-through text-gray-400">
              {" "}
              ₹{product?.price * 10}
            </span> */}
            <span className="text-red-600 text-lg">
              - {product?.discountPercentage}%{" "}
            </span>
          </span>

          {/* ---------- emi ------- */}
          <span className="hidden md:inline">Inclusive of all taxes</span>
          <span className="hidden md:inline">
            EMI starts at ₹{~~(discountedPrice / 10)}. No Cost EMI available
          </span>
        </div>

        {id && (
          <div className="flex gap-3 flex-col md:w-[35%] lg:w-[30%] ">
            <span className="text-[#1e8999] hidden md:inline">
              Free delivery by{" "}
              <span className="text-black hidden text-sm md:inline">
                {getDeliveryDate()}
              </span>
            </span>
            <span className="hidden md:inline">
              Or fastest delivery Today. Order within 36 mins.
            </span>
            <span className="text-[#1e8999] hidden md:inline">
              Cash on Delivery <span className="text-black">is available</span>
            </span>
            <span className="text-[#1e8999] hidden md:inline">
              7 days replacement
            </span>

            <span>
              Quantity :{" "}
              <select onChange={(e) => setQuantity(parseInt(e.target.value))}>
                {Array.from({ length: 10 }).map((item, ind) => {
                  return (
                    <option value={ind + 1} key={ind}>
                      {ind + 1}
                    </option>
                  );
                })}
              </select>
            </span>
            {/* ----------- add to cart and buy now button ------ */}
            <button
              className="px-5 py-2 rounded-3xl bg-[#FFD814] hover:bg-[#e8c30f] max-w-[100%] mt-2"
              onClick={addItemToCart}
            >
              Add to Cart
            </button>
            <button className="px-5 py-2 rounded-3xl bg-[#FA8900] hover:bg-[#c4700a]  max-w-[100%] " onClick={()=>addItemToCart("/cart")}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;

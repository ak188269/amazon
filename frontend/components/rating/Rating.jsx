'use client'
import React, { useMemo } from 'react'

const Rating = ({productRating , totalRating = 5}) => {
    const rating = Math.floor(productRating) || 3;
  const isDecimalRating = useMemo(() => parseFloat(productRating) !== rating, []);
  return (
    <span className="flex gap-1 items-center">
    <span className="">{productRating || "3.5"}</span>
    <span className="flex gap-1 items-center">
      {Array.from({ length: rating }).map(
        (_ , ind) => {
          return (
            <span className="" key={ind}>
              <img src="/icons/productCard/star.svg" alt="rating" />
            </span>
          );
        }
      )}
      {isDecimalRating ? (
        <span className="">
          <img src="/icons/productCard/half_star.svg" alt="rating" />
        </span>
      ) : (
        null
      )}

      {Array.from({ length: totalRating - rating - isDecimalRating }).map(
        (_ , ind) => {
          return (
            <span className="" key={ind}>
              <img
                src="/icons/productCard/empty_star.svg"
                alt="rating"
              />
            </span>
          );
        }
      )}
    </span>
  </span>
  )
}

export default Rating
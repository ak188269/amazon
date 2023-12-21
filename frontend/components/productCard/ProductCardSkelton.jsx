// ------------- skelton of product card -------------
const ProductCardSkelton = () => {
  return (
    <>
      <div className={`flex gap-9 bg-white  p-3`}>
        {/* --------- left part containing product images ------------*/}
        <div className="min-w-[30%] max-w-[350px] aspect-square bg-[#cecdcd] rounded">
          <div className="shimmer-effect w-full h-full"></div>
        </div>

        {/* --- right side --------------- */}
        <div className={`flex flex-col gap-6 border-0 w-full border-red-900  `}>
          {/* --------- product description------------------*/}
          <span className="bg-loading h-6 w-2/3 rounded-lg"></span>

          <span className="bg-loading h-4 w-1/2 rounded-lg"> </span>
          <span className="bg-loading h-4 w-1/3 rounded-lg"> </span>
          <span className="bg-loading h-4 w-1/4 rounded-lg"> </span>

          {/* ----------- add to cart and buy now button ------ */}

          <div className="flex gap-6 my-auto">
            <button className="px-5 py-2 rounded-md bg-loading h-8 w-[100px]"></button>
            <button className="px-5 py-2 rounded-md bg-loading h-8 w-[100px]"></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardSkelton;

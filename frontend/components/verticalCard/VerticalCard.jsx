import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VerticalCard = ({data}) => {
    // format of data is 
    // data = {
    //     title : "some title",
    //     images : [
    //         {
    //             caption : "some caption",
    //             url : "/images/image.jpg"
    //         },
    //     ]
    // }
  return (
    <div className={`px-3 py-4 bg-white border w-fit flex flex-col gap-5 max-w-[290px] min-w-[200px] items-center justify-between`}>
        <h1 className={`font-semibold text-xl`}>{data.title || "hey this is title"}</h1>
        <div className={`grid grid-cols-2 gap-x-2 gap-y-6 justify-between border-red-600  box-border`}>
            {data.images.map((item,ind)=>{
                return (
                    <div key={ind}>
                       <div 
                       style={{
                        width:"130px",
                        height:"110px",
                        overflow:"hidden"
                       }}
                       >
                       <Image 
                        src={item.url}
                        width={100}
                        height={200}
                        alt='product'
                        objectFit='contain'
                        style={{width:"100%" , height:"100%" ,}}
                        className={`transform scale-x-125`}
                        />
                       </div>
        <span className={`text-xs`} >
            {item.caption}
        </span>
                    </div>
                )
            })}
        </div>

        <Link href={"/"} className={`text-sm text-[#288798] mr-auto mt-auto`}>
          {data.link_text}
        </Link>
    </div>
  )
}

export default VerticalCard;
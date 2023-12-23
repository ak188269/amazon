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
    <div className={`px-3 py-4 bg-white  flex flex-col gap-5 w-full min-w-[200px] sm:w-[48%] lg:w-[24%] lg:gap-3`}>
        <h1 className={`font-semibold text-xl`}>{data.title || "hey this is title"}</h1>
        <div className={`grid grid-cols-2 gap-x-3 gap-y-5 border-0  border-red-500  box-border`}>
            {data.images.map((item,ind)=>{
                return (
                    <Link key={ind} href={item.navigate_to} className='border-0 border-green-500 w-[100%]'>
                       <div 
                       className='w-full aspect-square'
                       >
                       <Image 
                        src={item.url}
                        width={100}
                        height={200}
                        alt='product'
                       
                        className={`w-full h-full object-cover`}
                        />
                       </div>
        <span className={`text-xs`} >
            {item.caption}
        </span>
                    </Link>
                )
            })}
        </div>

        <Link href={`${data?.images?.[0].navigate_to}`} className={`text-sm text-[#288798] mr-auto mt-auto`}>
          {data.link_text}
        </Link>
    </div>
  )
}

export default VerticalCard;
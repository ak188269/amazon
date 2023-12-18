import Image from 'next/image'
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
    <div className={`px-2 py-3 bg-white`}>
        <h1 className={`font-semibold text-lg`}>{data.title}</h1>
        <div className={`grid grid-cols-2 gap-2`}>
            {data.images.map((item,ind)=>{
                return (
                    <div key={ind}>
                        <Image 
                        src={item.url}
                        width={30}
                        height={30}
                        alt='product'
                        style={{width:"auto" , height:"auto"}}
                        />
        <span>
            {item.caption}
        </span>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default VerticalCard
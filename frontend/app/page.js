import Carousel from '@/components/carousel/Carousel'
import HorizontalCard from '@/components/horizontalCard/HorizontalCard'
import VerticalCard from '@/components/verticalCard/VerticalCard'
import data from '@/constants/data'



export default function Home() {
  const category = 
  [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ];


  return (
   <>
 <main>
 
 <Carousel/>

 <div className={`flex flex-col gap-5 mx-auto lg:absolute lg:top-[60vh] right-0 left-0 px-4  card-page overflow-hidden   border-red-600  `}>
  {/* --------- vertical card -------- */}
  <div className={`flex gap-3 flex-wrap mx-auto w-full sm:w-[95%] md:w-full xl:w-[1200px] border-0 border-red-500 sm:justify-between`}>
  {
    data.map((item,ind)=>{
     return  <VerticalCard data={item} key={ind}/>
    })
  }
</div>
  {/* ----------- horizontal card ------- */}
  {
    category.map((item,ind)=>{
      return (
<HorizontalCard category={item} key={ind}/>

      )
    })
  }


 </div>
 </main>
   
   
   </>
  )
}

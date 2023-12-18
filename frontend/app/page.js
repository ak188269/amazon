import Carousel from '@/components/carousel/Carousel'
import CategoryNavbar from '@/components/category_navbar/CategoryNavbar'
import HorizontalCard from '@/components/horizontalCard/HorizontalCard'
import Navbar from '@/components/navbar/Navbar'
import VerticalCard from '@/components/verticalCard/VerticalCard'
import data from '@/constants/data'

export default function Home() {
  return (
   <>
 <main>
 <Navbar/>
 <CategoryNavbar/>
 <Carousel/>

 <div className={`flex flex-col gap-3 absolute top-[60vh] right-0 left-0 px-4  card-page overflow-hidden  border-red-600`}>
  {/* --------- vertical card -------- */}
  <div className={`flex justify-between gap-3 flex-wrap`}>
  {
    data.map((item,ind)=>{
     return  <VerticalCard data={item} key={ind}/>
    })
  }
</div>
  {/* ----------- horizontal card ------- */}
<HorizontalCard/>

 </div>
 </main>
   
   
   </>
  )
}

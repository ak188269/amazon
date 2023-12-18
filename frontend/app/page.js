import Carousel from '@/components/carousel/Carousel'
import CategoryNavbar from '@/components/category_navbar/CategoryNavbar'
import Navbar from '@/components/navbar/Navbar'
import Image from 'next/image'
export default function Home() {
  return (
   <>
 <main>
 <Navbar/>
 <CategoryNavbar/>
 <Carousel/>

 </main>
   
   
   </>
  )
}

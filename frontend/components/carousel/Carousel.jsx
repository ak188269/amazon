"use client"
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import './carousel.css'; // Make sure to create a CSS file for your styles

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const DesktopItems = [
    { id: 1, src: 'first.jpg', alt: 'Slide 1' },
    { id: 2, src: 'second.jpg', alt: 'Slide 2' },
    { id: 3, src: 'third.jpg', alt: 'Slide 3' },
    { id: 4, src: 'fourth.jpeg', alt: 'Slide 4' },
    { id: 5, src: 'fifth.jpg', alt: 'Slide 5' },
    // Add more items as needed
  ];
  const MobileItems = [
    { id: 3, src: 'third3.jpg', alt: 'Slide 3' },
    { id: 1, src: 'first1.jpg', alt: 'Slide 1' },
    { id: 4, src: 'fourth4.jpg', alt: 'Slide 4' },
    { id: 2, src: 'second2.jpg', alt: 'Slide 2' },
    { id: 5, src: 'fifth5.jpg', alt: 'Slide 5' },
    // Add more items as needed
  ];
  const [items , setItems] = useState(DesktopItems);

  const setImages = useCallback(()=> {
    if((typeof window !== 'undefined' && window.innerWidth >= 1024)){
      setItems(DesktopItems);
    }
    else setItems(MobileItems);
  },[]);

  useLayoutEffect(()=>{
    setImages();
    // window.onresize = setImages;
    // return ()=>{
    //   window.removeEventListener('resize', setImages);
    // }
  },[])

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(()=>{
    const timer = setInterval(() => {
        
        nextSlide();
    }, 3000);
    return ()=>{
        clearInterval(timer);
    }
  },[]);

  return (
    <div className="carousel relative  overflow-hidden">
      <div className="carousel-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item,ind) => (
          <div key={ind} className="carousel-item" >
            <img src={`/images/carousel/${item.src}`} alt={item.alt} />
          </div>
        ))}
      </div>

      {/* Optional: Navigation buttons */}
      {/* <button className="carousel-btn absolute" onClick={prevSlide}>Previous</button>
      <button className="carousel-btn absolute right-0" onClick={nextSlide}>Next</button> */}
      <div className={`absolute border-0 flex gap-4 bottom-4  left-[50%] transform -translate-x-1/2 lg:hidden`}>
        {
          Array.from({length : items.length}).map((_,ind)=>{
            return (
              <div className={`w-[9px] aspect-square  rounded-lg ${currentIndex === ind ? 'bg-[#3c97e6]' : 'bg-white'}`} key={ind} onClick={()=>showSlide(ind)}>
                {/*------ this is cricle representing slid--------- */}
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Carousel;

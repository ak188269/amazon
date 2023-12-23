"use client"
import React, { useEffect, useState } from 'react';
import './carousel.css'; // Make sure to create a CSS file for your styles

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    { id: 1, src: 'first.jpg', alt: 'Slide 1' },
    { id: 2, src: 'second.jpg', alt: 'Slide 2' },
    { id: 3, src: 'third.jpg', alt: 'Slide 3' },
    { id: 4, src: 'fourth.jpeg', alt: 'Slide 4' },
    { id: 5, src: 'fifth.jpg', alt: 'Slide 5' },
    // Add more items as needed
  ];

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
    }, 4000);
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
    </div>
  );
};

export default Carousel;

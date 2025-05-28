import React, { useState, useEffect } from "react";
import './Style/Slideshow.css';

const images = [
 "/PublicImages/img-1.jpg",
 "/PublicImages/img-2.jpg",
 "/PublicImages/img-3.jpg",
 "/PublicImages/img-4.jpg",
 "/PublicImages/img-5.jpg",
 "/PublicImages/img-6.jpg",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="slideshow-container">
      <button className="prev" onClick={prevSlide}>&#10094;</button>
        <img src={images[currentIndex]} alt="Slideshow" className="slide-image" />
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Slideshow;

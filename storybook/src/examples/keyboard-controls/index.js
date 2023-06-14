import React, { useEffect, useRef } from "react";
import ReactUltimateCarousel from 'react-ultimate-carousel';
import "./App.css";
import "../../index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from './Slide';

function Keyboard() {
  const slides = new Array(10).fill(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        carouselRef.current.navigateSlide("next");
      } else if (event.key === "ArrowLeft") {
        carouselRef.current.navigateSlide("previous");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className='carousel--keyboard'>
      <ReactUltimateCarousel ref={carouselRef}>
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
      <p>Use the arrow keys on your keyboard ← →</p>
    </div>
  );
}

export default Keyboard;

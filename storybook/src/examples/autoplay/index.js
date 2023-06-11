import React, { useEffect, useRef } from "react";
import ReactUltimateCarousel from 'react-ultimate-carousel';
import "./App.css";
import "./index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from './Slide';

function Autoplay() {
  const slides = new Array(10).fill(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      carouselRef.current.navigateSlide("next");
    }, 4000);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, []);

  return (
    <div className='carousel--autoplay'>
      <ReactUltimateCarousel ref={carouselRef}>
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
    </div>
  );
}

export default Autoplay;

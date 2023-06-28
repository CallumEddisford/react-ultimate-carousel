import React, { useRef } from 'react';
import ReactUltimateCarousel from '../../';
import "./styles.css";
import "../global.css";
import "../../../lib/styles/carousel.css";
import Slide from '../slide';

function WithRef() {
  const slides = new Array(10).fill(0);
  const carouselRef = useRef();
  return (
    <div className='carousel--ref'>
      <ReactUltimateCarousel
        ref={carouselRef}
        startingIndex={4}
        threshold={0.5}
        axis="vertical"
      >
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
      <button onClick={() => carouselRef.current.navigateSlide('previous')}>Previous</button>
      <button onClick={() => carouselRef.current.navigateSlide(4)}>Slide 5</button>
      <button onClick={() => carouselRef.current.navigateSlide('next')}>Next</button>
    </div>
  );
}

export default WithRef;

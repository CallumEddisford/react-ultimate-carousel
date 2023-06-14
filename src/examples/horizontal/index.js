import React from 'react';
import ReactUltimateCarousel from '../../';
import "./styles.css";
import "../global.css";
import "../../../lib/styles/carousel.css";
import Slide from '../slide';

function Horizontal() {
  const slides = new Array(10).fill(0);

  return (
    <div className='carousel--horizontal'>
      <ReactUltimateCarousel
        startingIndex={4}
        threshold={0.5}
      >
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
    </div>
  );
}

export default Horizontal;

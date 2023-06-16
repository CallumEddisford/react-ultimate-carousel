import React from 'react';
import ReactUltimateCarousel from '../../';
import "./styles.css";
import "../global.css";
import "../../../lib/styles/carousel.css";
import Slide from '../slide';

function Vertical() {
  const slides = new Array(10).fill(0);

  return (
    <div className='carousel--vertical'>
      <ReactUltimateCarousel
        startingIndex={4}
        threshold={0.5}
        axis="vertical"
      >
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
    </div>
  );
}

export default Vertical;

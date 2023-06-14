import React from 'react';
import ReactUltimateCarousel from '../../';
import "./styles.css";
import "../global.css";
import "../../../lib/styles/carousel.css";
import Slide from "../slide";
import { useState } from "react";

function InfiniteScroll() {
  const initialSlides = new Array(10).fill(0);

  const [slides, setSlides] = useState(initialSlides);

  const handleSlideChange = (index) => {
    if (index === (slides.length - 2)) {
      // Fetch and set your new data
      setSlides([...slides, ...initialSlides])
    }
  };

  return (
    <div className="carousel--infinite">
      <ReactUltimateCarousel
        axis="vertical"
        onChange={handleSlideChange}
      >
        {slides.map((_, index) => (
          <Slide key={`slide-${index}`} index={index} />
        ))}
      </ReactUltimateCarousel>
      <ul>
        <li>Amount of slides {slides.length}</li>
      </ul>
    </div>
  );
}

export default InfiniteScroll;

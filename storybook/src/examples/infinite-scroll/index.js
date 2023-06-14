import ReactUltimateCarousel from "react-ultimate-carousel";
import "./App.css";
import "../../index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from "./Slide";
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

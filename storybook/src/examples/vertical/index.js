import ReactUltimateCarousel from "react-ultimate-carousel";
import "./App.css";
import "../../index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from "./Slide";

function Vertical() {
  const slides = new Array(10).fill(0);

  return (
    <div className="carousel--vertical">
      <ReactUltimateCarousel
        threshold={0.5}
        axis="vertical"
      >
        {slides.map((_, index) => (
          <Slide key={`slide-${index}`} index={index} />
        ))}
      </ReactUltimateCarousel>
    </div>
  );
}

export default Vertical;

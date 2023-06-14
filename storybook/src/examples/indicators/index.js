import ReactUltimateCarousel from "react-ultimate-carousel";
import "./App.css";
import "../../index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from "./Slide";
import Indicator from "./Indicator";

function Indicators() {
  const slides = new Array(10).fill(0);

  const handleChange = (v) => console.log("Slide Index: ", v);

  return (
    <div className="carousel--indicators">
      <ReactUltimateCarousel
        startingIndex={4}
        threshold={0.5}
        onChange={handleChange}
        renderControls={({ navigateSlide, visibleIndex }) => (
          <div className="indicators">
            {slides.map((_, index) => (
              // These could also be thumbnails.. Up to you..
              <Indicator
                key={`indicator-${index}`}
                index={index}
                isActive={visibleIndex === index}
                navigateSlide={navigateSlide}
              />
            ))}
          </div>
        )}
      >
        {slides.map((_, index) => (
          <Slide key={`slide-${index}`} index={index} />
        ))}
      </ReactUltimateCarousel>
    </div>
  );
}

export default Indicators;

import ReactUltimateCarousel from 'react-ultimate-carousel';
import "./App.css";
import "./index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from './Slide';

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

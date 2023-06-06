import ReactVerticalCarousel from 'react-vertical-carousel';
import "./App.css";
import "./index.css";
import "react-vertical-carousel/lib/styles/carousel.css";
import Slide from './Slide';

function App() {
  const slides = new Array(10).fill(0);

  return (
    <div className='carousel--container'>
      <ReactVerticalCarousel threshold={0.5}>
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactVerticalCarousel>
    </div>
  );
}

export default App;

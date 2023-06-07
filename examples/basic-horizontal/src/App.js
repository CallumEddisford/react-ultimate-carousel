import ReactUltimateCarousel from 'react-ultimate-carousel';
import "./App.css";
import "./index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from './Slide';

function App() {
  const slides = new Array(10).fill(0);

  const handleChange = (v) => console.log('Slide Index: ', v);

  return (
    <div className='carousel--container'>
      <ReactUltimateCarousel
        threshold={0.5}
        onChange={handleChange}
      >
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
    </div>
  );
}

export default App;

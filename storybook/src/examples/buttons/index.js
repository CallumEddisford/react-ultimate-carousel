import ReactUltimateCarousel from 'react-ultimate-carousel';
import "./App.css";
import "./index.css";
import "react-ultimate-carousel/lib/styles/carousel.css";
import Slide from './Slide';

function Buttons() {
  const slides = new Array(10).fill(0);

  const handleChange = (v) => console.log('Slide Index: ', v);

  const handleClick = (direction, navigateSlide, visibleIndex) => {
    // Your custom logic here...

    // In this example we disallow the user to
    // navigate past the first and last slides
    if (visibleIndex === 0 && direction === 'previous') return;
    if (visibleIndex === (slides.length - 1) && direction === 'next') return;

    navigateSlide(direction)
  };

  return (
    <div className='carousel--buttons'>
      {/* Simple */}
      <ReactUltimateCarousel
        threshold={0.5}
        onChange={handleChange}
        renderControls={({ navigateSlide, visibleIndex }) => (
          <div className='controls'>
            <button onClick={() => navigateSlide('previous')}>Previous</button>
            <button onClick={() => navigateSlide('next')}>Next</button>
            <p>Current Slide: {visibleIndex + 1}</p>
          </div>
        )}
      >
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>

      {/* Custom handler */}
      <p>In this example we disallow the user to navigate past the first and last slides using custom logic</p>
      <ReactUltimateCarousel
        threshold={0.5}
        onChange={handleChange}
        renderControls={({ navigateSlide, visibleIndex }) => (
          <div className='controls'>
            <button onClick={() => handleClick('previous', navigateSlide, visibleIndex)}>Previous</button>
            <button onClick={() => handleClick('next', navigateSlide, visibleIndex)}>Next</button>
            <p>Current Slide: {visibleIndex + 1}</p>
          </div>
        )}
      >
        {slides.map((_, index) => <Slide key={`slide-${index}`} index={index} />)}
      </ReactUltimateCarousel>
    </div>
  );
}

export default Buttons;

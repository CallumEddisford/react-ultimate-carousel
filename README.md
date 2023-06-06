# React Vertical Carousel

A simple yet robust vertical carousel component for React.

## Installation

You can install `react-vertical-carousel` using npm or yarn:

```shell
npm install react-vertical-carousel
```

or

```shell
yarn add react-vertical-carousel
```

## Usage

Here's an example of how to use the ReactVerticalCarousel component:

```jsx
// App.js
import ReactVerticalCarousel from 'react-vertical-carousel';
import 'react-vertical-carousel/lib/styles/carousel.css';
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
```

```jsx
// Slide.js
import React from 'react';

const Slide = ({ isActive, innerRef, index }) => {
  return (
    <div ref={innerRef} className="slide">
      Slide {index} {isActive ? 'is active' : 'is not active'}
    </div>
  );
};

export default Slide;

```

Your slide will receive the following props:

- `isActive`: A boolean indicating whether the slide is currently active.
- `innerRef`: A ref that needs to be assigned to the slide element for intersection observation.
- `index`: The index of the slide.

## Styling
To apply the required styles to the carousel and slides, you can import the provided CSS file:

```jsx
import "react-vertical-carousel/lib/styles/carousel.css";
```

Style your slides anyway you want to! The slider will respond to its container.


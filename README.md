# Ultimate Carousel

> _"The best kind of web carousel is the one you build yourself!"_

Introducing Ultimate Carousel, a utility-first carousel for React apps that prioritizes functionality over pre-packaged features.

Ultimate Carousel empowers you to build your carousel exactly the way you envision it. Instead of overwhelming you with a multitude of features that you may not even use, this package focuses on providing the essential functionality to your own components so that you can craft anything.

While other carousel packages may be convenient for quick implementation, they often include a plethora of features that end up bloating your builds unnecessarily.

Ultimate slider gives you the tools to create all the features you want and need.

# Features

- Utility first
- Single element markup, the rest is your own
- No bloated styles, just a few required rules - complete control over how you style your carousel!
- No JS transition tom foolery, pure native HTML elements
- Plenty of demo carousels;
  - Horizontal
  - Vertical
  - With navigation buttons
  - With indicators/thumbnails
  - With keyboard controls
  - Autoplay
  - Infinite scroll
  - TikTok style
- Light weight with a tiny package size of `~6kb`

# Installation

You can install `react-vertical-carousel` using npm or yarn:

```shell
npm install react-vertical-carousel
```

or

```shell
yarn add react-vertical-carousel
```

# Usage

To get started, first import the component and stylesheet:

```js
import ReactUltimateCarousel from "react-ultimate-carousel";
import "react-ultimate-carousel/lib/styles/carousel.css";
```

Then simply wrap your slides with the component, its important to note that each slide requires a ref to be set using the `innerRef` propery which is automatically provided by the component.

```js
const Slide = ({ innerRef, index, isActive }) => {
  return (
    <div ref={innerRef} className="slide">
      Slide {index + 1} {isActive ? "is active" : "is not active"}
    </div>
  );
};

const App = () => {
  const slides = new Array(10).fill(0);

  return (
    <ReactUltimateCarousel>
      {slides.map((_, index) => (
        <Slide key={`slide-${index}`} index={index} />
      ))}
    </ReactUltimateCarousel>
  );
};

export default App;
```

# Props

## ReactUltimateCarousel

| Name           | Value                        | Description                                                                                                        |
|----------------|------------------------------|--------------------------------------------------------------------------------------------------------------------|
| axis           | `'horizontal'`, `'vertical'` | The direction of the carousel, defaults to `'horizontal'`                                                          |
| threshold      | `number`                     | The point at which the active slide changes, defaults to `0.5`                                                     |
| onChange       | `function`                   | Callback to handle when the active slide changes                                                                   |
| renderControls | `function`                   | Provides utility props to add to your own elements which can control the slider. See below for renderControls props |

## renderControls

| Name     | Value      | Description                                             |
|----------|------------|---------------------------------------------------------|
| key      | `number`   | Provides the current slide index                        |
| isActive | `boolean`  | Declares whether the current slide is active            |
| innerRef | `function` | The ref that needs to be assigned to your slide element |

You can also use your own props alongside these props

# Examples

Please check out the examples directory, there are serveral examples of how to achieve common carousel requirements.

The examples projects have been created with `create-react-app` so can be simply started by navigating to the example you want and starting the app:

```shell
  cd examples/horizontal
  npm install
  npm run start
```

# Roadmap:

- Testing!!!
- Keyboard controls example
- Autoplay example
- Infinite scroll example
- Publish package
- Accessibility options

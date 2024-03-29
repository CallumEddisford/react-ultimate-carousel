# React Ultimate Carousel

[![npm version](https://badge.fury.io/js/react-ultimate-carousel.svg)](https://badge.fury.io/js/react-ultimate-carousel)
![workflow](https://github.com/CallumEddisford/react-ultimate-carousel/actions/workflows/npm-publish.yml/badge.svg)
![cypress](https://github.com/CallumEddisford/react-ultimate-carousel/actions/workflows/test.yml/badge.svg)

> _"The best kind of web carousel is the one you build yourself!"_

Introducing React Ultimate Carousel, a utility-first carousel for React apps that prioritizes functionality over pre-packaged features.

React Ultimate Carousel empowers you to build your carousel exactly the way you envision it. Instead of overwhelming you with a multitude of features that you may not even use, this package focuses on providing the essential functionality to your own components so that you can craft anything.

While other carousel packages may be convenient for quick implementation, they often include a plethora of features that end up bloating your builds unnecessarily.

React Ultimate Carousel gives you the tools to create all the features you want and need.

Relies on CSS Scroll Snap: [https://caniuse.com/css-snappoints](https://caniuse.com/css-snappoints)

DEMOS: [https://react-ultimate-carousel.callumeddisford.co.uk/](https://react-ultimate-carousel.callumeddisford.co.uk/)

## Features

- Utility first, provides the base functionality you need
- Single element markup, the rest is your own
- No bloated styles, just a few required rules - complete control over how you style your carousel!
- No JS translation tom foolery, pure native HTML elements
- Light weight with a tiny package size of `~2.6kb` gzipped
- Horizontal and vertical axis support
- Swipe to slide
- Drag to slide
- Plenty of demos;
  - Horizontal
  - Vertical
  - With navigation buttons
  - With indicators/thumbnails
  - With keyboard controls
  - Autoplay
  - Infinite scroll
  - TikTok style

## Installation

You can install `react-ultimate-carousel` using npm or yarn:

```shell
npm install react-ultimate-carousel
```

or

```shell
yarn add react-ultimate-carousel
```

## Usage

To get started, first import the component and style sheet:

```js
import ReactUltimateCarousel from "react-ultimate-carousel";
import "react-ultimate-carousel/lib/styles/carousel.min.css";
```

Then simply wrap your slides with the component, its important to note that each slide requires a ref to be set using the `innerRef` property which is automatically provided by the component.

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

## Props

### ReactUltimateCarousel

| Name           | Value                        | Description                                                                                                         |
|----------------|------------------------------|---------------------------------------------------------------------------------------------------------------------|
| axis           | `'horizontal'`, `'vertical'` | The direction of the carousel, defaults to `'horizontal'`                                                           |
| threshold      | `number`                     | The point at which the active slide changes, defaults to `0.5`                                                      |
| isDraggable    | `boolean`                    | Sets whether the carousel can be clicked and dragged with a mouse, defaults to `true`                               |
| onChange       | `function`                   | Callback to handle when the active slide changes, provides the slide index when triggered                           |
| renderControls | `function`                   | Provides utility props to add to your own elements which can control the slider, see below for renderControls props |

### Render Controls

| Name          | Value      | Description                                                                        |
|---------------|------------|------------------------------------------------------------------------------------|
| navigateSlide | `function` | A function to navigate to a slide, accepts `"next"`, `"previous"` or a slide index |
| visibleIndex  | `number`   | Declares whether the current slide is active                                       |

### Slides

Each slide will receive the following props:

| Name          | Value      | Description                                                                        |
|---------------|------------|------------------------------------------------------------------------------------|
| key           | `number`   | Provides the current slide index                                                   |
| isActive      | `boolean`  | Declares whether the current slide is active                                       |
| innerRef      | `function` | The ref that needs to be assigned to your slide element                            |
| navigateSlide | `function` | A function to navigate to a slide, accepts `"next"`, `"previous"` or a slide index |

### Other

#### Snap stop

To prevent the carousel from navigating through multiple slides when swiping (or scrolling) and instead stop on each slide, add the following css rule to your slide component, this will be the element that has the `innerRef` prop attached to it:

```css
scroll-snap-stop: always;
```

#### Render controls anywhere

If `renderControls` isn't for you, and by that you want to place your own controls anywhere within your app and not directly underneath the carousel, then you can with use of a `useRef`. Add the following changes  to your project:

```jsx
const carouselRef = useRef(null);

return (
  <ReactUltimateCarousel ref={carouselRef}>
    // ...your slides
  </ReactUltimateCarousel>
);
```

The `carouselRef` variable will now provide all the carousel functions including:

```jsx
const {
  visibleIndex,
  navigateSlide,
} = carouselRef.current
```

See `src/examples/keyboard-controls/index.js` for similar usage

## Examples

Please check out the `src/examples` directory, where there are several examples of how to achieve common carousel requirements.

## Local development

To start storybook locally:

```shell
  npm install
  npm run storybook
```

## Releases

To release new package versions, simply update the version number in the `package.json` file following the [SemVer](https://semver.org/) specification, then run an `npm install` to apply the the new version to the lock file.
Once these changes are merged into the `main` branch, publish a new release through the GitHub Releases UI and use the same tag version as previously set in the `package.json` file, and the package will be released on NPM through GitHub Actions.

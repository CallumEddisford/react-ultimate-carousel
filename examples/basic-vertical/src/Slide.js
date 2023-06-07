const Slide = ({ isActive, innerRef, index }) => {
  return (<div ref={innerRef} className="slide">Slide {index} {isActive ? 'is active' : 'is not active'}</div>)
};

export default Slide;

const Slide = ({ isActive, innerRef, index, isLoading }) => {
  return (<div ref={innerRef} className="slide">Slide {isLoading ? 'loading' : index + 1} {isActive ? 'is active' : 'is not active'}</div>)
};

export default Slide;

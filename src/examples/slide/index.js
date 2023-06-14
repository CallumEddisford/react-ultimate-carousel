import React from "react";
const Slide = ({ isActive, innerRef, index }) => {
  return (
    <div ref={innerRef} className="slide">
      Slide {index + 1} {isActive ? "is active" : "is not active"}
    </div>
  );
};

export default Slide;

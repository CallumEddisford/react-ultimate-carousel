import React from "react";

const Indicators = ({ isActive, index, navigateSlide }) => {
  return (
    <div
      onClick={() => navigateSlide(index)}
      className={`indicator ${isActive ? "active" : ""}`}
    >
      {index + 1}
    </div>
  );
};

export default Indicators;

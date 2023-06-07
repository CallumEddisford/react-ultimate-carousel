import { useEffect, useRef } from "react";

const Slide = ({ isActive, innerRef, index, video }) => {
  const vidRef = useRef();

  const handlePlay = () => {
    vidRef.current.muted = false;
    vidRef.current.play().catch(() => {
      vidRef.current.muted = true;
      vidRef.current.play()
  });
  }

  useEffect(() => {
    isActive ? handlePlay() : vidRef.current.pause();
  }, [isActive]);
  
  return (
    <div ref={innerRef} className="slide">
      <video ref={vidRef} playsInline autoplay loop>
        <source src={video.sources[0]} type="video/mp4" />
      </video>
    </div>
  );
};

export default Slide;

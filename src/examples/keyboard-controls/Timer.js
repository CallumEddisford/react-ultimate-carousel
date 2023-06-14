import { useEffect } from "react";

const Timer = ({ navigateSlide }) => {
  useEffect(() => {
    let timer = setTimeout(() => navigateSlide("next"), 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
};

export default Timer;

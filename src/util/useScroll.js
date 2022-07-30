import { useEffect } from "react";

const useScroll = () => {
  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, []);
};

export default useScroll;

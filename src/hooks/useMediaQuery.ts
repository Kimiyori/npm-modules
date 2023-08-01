import { useEffect, useState } from "react";
import { isBrowser } from "../utils/helpers";

export const useMediaQuery = ({ query }: { query: string }): boolean => {
  const getMatches = () => {
    return isBrowser ? window.matchMedia(query).matches : false;
  };

  const [matches, setMatches] = useState(getMatches());

  const handleChange = () => setMatches(getMatches());

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

import { FC } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { MediaQueryProps } from "../utils/types";
import { handleQueryOptions } from "../utils/helpers";

export const MediaQuery: FC<MediaQueryProps> = ({ children, ...query }) => {
  const matches = useMediaQuery({ query: handleQueryOptions(query) });
  if (typeof children === "function") return <>{children(matches)}</>;
  return matches ? <>{children}</> : null;
};

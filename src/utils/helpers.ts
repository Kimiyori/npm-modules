import { MediaQueryVariantsProps } from "./types";

export const isDocumentVisible = () => document.visibilityState === "visible";
export const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

export const mediaQueryVariants = (
  value: MediaQueryVariantsProps[keyof MediaQueryVariantsProps]
): {
  [key in keyof MediaQueryVariantsProps]: string;
} => {
  return {
    orientation: `(orientation: ${value})`,
    minResolution: `(min-resolution: ${
      typeof value === "number" ? value + "dppx" : value
    })`,
    maxResolution: `(max-resolution: ${
      typeof value === "number" ? value + "dppx" : value
    })`,
    minWidth: `(min-width: ${value}px)`,
    maxWidth: `(max-width: ${value}px)`,
    minHeight: `(min-height: ${value}px)`,
    maxHeight: `(max-height: ${value}px)`,
  };
};
export const handleQueryOptions = (
  requestedVariants: Partial<MediaQueryVariantsProps>
) => {
  const finalArray: string[] = [];
  Object.entries(requestedVariants).forEach(([variant, resolution]) => {
    const variants = mediaQueryVariants(resolution);
    return (
      resolution &&
      variant in variants &&
      finalArray.push(variants[variant as keyof MediaQueryVariantsProps])
    );
  });
  return finalArray.join(" and ");
};
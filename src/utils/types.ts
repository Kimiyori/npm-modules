import { ReactNode } from "react";

export type CallbackProps = (visibility: boolean) => void;
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
type StringRes = `${number}dppx`;
export type MediaQueryVariantsProps = {
  orientation: "portrait" | "landscape";
  minResolution: number | StringRes;
  maxResolution: number | StringRes;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
};
export type MediaQueryProps = {
  children: ReactNode | ((matches: boolean) => ReactNode);
} & AtLeastOne<Partial<MediaQueryVariantsProps>>;

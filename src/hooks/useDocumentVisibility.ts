import { useEffect, useReducer, useRef } from "react";
import { isBrowser, isDocumentVisible } from "../utils/helpers";
import { CallbackProps } from "../utils/types";

export const useDocumentVisibility = () => {
  const [visible, changeVisible] = useReducer(
    (currState) => (currState !== undefined ? !currState : undefined),
    isBrowser ? isDocumentVisible() : undefined
  );
  const callbackListRef = useRef<CallbackProps[]>([]);
  const [count, increaseCount] = useReducer((currCount) => ++currCount, 0);

  const onVisibilityChange = (callback: CallbackProps) => {
    callbackListRef.current.push(callback);
    return () =>
      (callbackListRef.current = callbackListRef.current.filter(
        (currCallback) => currCallback !== callback
      ));
  };
  useEffect(() => {
    const handleVisibility = () => {
      const currentVisibleState = isDocumentVisible();
      callbackListRef.current.forEach((currentCallback) =>
        currentCallback(currentVisibleState)
      );
      currentVisibleState && increaseCount();
      changeVisible();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return {
    count,
    visible,
    onVisibilityChange,
  };
};

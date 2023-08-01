import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const mockWindowSize = (initQuery = true) => {
  let instance: any;
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      instance = {
        matches: initQuery,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
      instance.addEventListener("change", () => {
        instance.matches = !instance.matches;
      });

      return instance;
    }),
  });
  return instance;
};

describe("initial state", () => {
  test("initial state when matches", () => {
    mockWindowSize(true);
    const { result } = renderHook(() =>
      useMediaQuery({
        query: "(min-width: 1224px)",
      })
    );
    expect(result.current).toBe(true);
  });

  test("initial state when not matches", () => {
    mockWindowSize(false);
    const { result } = renderHook(() =>
      useMediaQuery({
        query: "(min-width: 1224px)",
      })
    );
    expect(result.current).toBe(false);
  });
});

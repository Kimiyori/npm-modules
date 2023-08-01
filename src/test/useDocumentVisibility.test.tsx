
import { fireEvent, renderHook } from "@testing-library/react";
import { useDocumentVisibility } from "../hooks/useDocumentVisibility";

const mockChangeVisibleState = (isVisible = true, invokeAction = false) => {
  Object.defineProperty(document, "visibilityState", {
    value: isVisible ? "visible" : "hidden",
  });
  invokeAction && fireEvent(document, new Event("visibilitychange"));
};

afterEach(() => {
  Object.defineProperty(document, "visibilityState", {
    value: "visible",
    writable: true,
  });
});

describe("initial state", () => {
  test("initial state count", () => {
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current.count).toBe(0);
  });
  test("initial visible state with visible state", () => {
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current.visible).toBe(true);
  });
  test("initial visible state with hidden state", () => {
    mockChangeVisibleState(false);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current.visible).toBe(false);
  });
});
describe("actions", () => {
  describe("check action in visible prop", () => {
    test("change visible state", () => {
      const { result } = renderHook(() => useDocumentVisibility());
      mockChangeVisibleState(false, true);
      expect(result.current.visible).toBe(false);
    });
    test("change visible state n times", () => {
      const { result } = renderHook(() => useDocumentVisibility());
      const n = Math.floor(Math.random() * 50);
      let initialStatetoChange = true;
      [...Array(n)].map(() => {
        initialStatetoChange = !initialStatetoChange;
        mockChangeVisibleState(initialStatetoChange, true);
      });
      expect(result.current.visible).toBe(initialStatetoChange);
    });
  });
  describe("check action in count prop", () => {
    test("change visible state once", () => {
      const { result } = renderHook(() => useDocumentVisibility());
      mockChangeVisibleState(false, true);
      mockChangeVisibleState(true, true);
      expect(result.current.count).toBe(1);
    });
    test("change visible state n times", () => {
      const { result } = renderHook(() => useDocumentVisibility());
      const n = Math.floor(Math.random() * 50);
      [...Array(n)].map(() => {
        mockChangeVisibleState(false, true);
        mockChangeVisibleState(true, true);
      });

      expect(result.current.count).toBe(n);
    });
  });
  describe("check action subscription", () => {
    test("change that subscription works with 1 callback", () => {
      let testCount = 0;

      const { result } = renderHook(() => useDocumentVisibility());
      result.current.onVisibilityChange((isVisible) => {
        isVisible && testCount++;
      });
      mockChangeVisibleState(false, true);
      mockChangeVisibleState(true, true);
      expect(testCount).toBe(1);
    });
    test("change that subscription works with n callbacks", () => {
      let testCountList = new Array(Math.floor(Math.random() * 50)).fill(0);

      const { result } = renderHook(() => useDocumentVisibility());
      testCountList.forEach((_, index) =>
        result.current.onVisibilityChange((isVisible) => {
          testCountList[index] = 1;
        })
      );
      mockChangeVisibleState(true, true);
      testCountList.forEach((testCount) => expect(testCount).toBe(1));
    });
    test("change that unsibscribe feature works", () => {
      let testCount = 0;

      const { result } = renderHook(() => useDocumentVisibility());
      const unsub = result.current.onVisibilityChange((isVisible) => {
        isVisible && testCount++;
      });
      mockChangeVisibleState(false, true);
      mockChangeVisibleState(true, true);
      expect(testCount).toBe(1);
      unsub();
      mockChangeVisibleState(false, true);
      mockChangeVisibleState(true, true);
      expect(testCount).toBe(1);
    });
  });
});

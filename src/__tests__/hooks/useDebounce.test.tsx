import { render, screen } from "@testing-library/react";
import { act } from "react";
import { useDebounce } from "../../hooks/useDebounce";

function TestComp<T>({ value, delay = 300 }: { value: T; delay?: number }) {
  const debounced = useDebounce(value, delay);
  return <div data-testid="out">{String(debounced)}</div>;
}

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("returns the initial value immediately", () => {
    render(<TestComp value="initial" delay={500} />);
    expect(screen.getByTestId("out").textContent).toBe("initial");
  });

  it("updates the debounced value after the specified delay", () => {
    const { rerender } = render(<TestComp value="a" delay={300} />);

    expect(screen.getByTestId("out").textContent).toBe("a");
    rerender(<TestComp value="b" delay={300} />);

    expect(screen.getByTestId("out").textContent).toBe("a");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByTestId("out").textContent).toBe("b");
  });

  it("cleans up pending timeout on unmount (no state update after unmount)", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { rerender, unmount } = render(<TestComp value="x" delay={200} />);

    rerender(<TestComp value="y" delay={200} />);
    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("works with zero delay (updates on next tick)", () => {
    const { rerender } = render(<TestComp value={1} delay={0} />);
    expect(screen.getByTestId("out").textContent).toBe("1");

    rerender(<TestComp value={2} delay={0} />);

    expect(screen.getByTestId("out").textContent).toBe("1");

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId("out").textContent).toBe("2");
  });
});

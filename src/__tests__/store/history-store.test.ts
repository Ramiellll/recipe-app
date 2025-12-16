import { useHistoryStore } from "../../store/history-store";

describe("history store", () => {
  beforeEach(() => {
    useHistoryStore.setState({ history: [] });
  });

  it("initial state is empty array", () => {
    const state = useHistoryStore.getState();
    expect(Array.isArray(state.history)).toBe(true);
    expect(state.history).toHaveLength(0);
  });

  it("addHistoryItem adds an item to the start of history", () => {
    const item = {
      id: "1",
      title: "Recipe One",
      timestamp: 1660000000000,
      liked: false,
      image: "img1.png",
      criteria: { area: "Italian", ingredient: "Tomato" },
    };

    useHistoryStore.getState().addHistoryItem(item);

    const state = useHistoryStore.getState();
    expect(state.history).toHaveLength(1);
    expect(state.history[0]).toEqual(item);
  });

  it("adding multiple items preserves order (most recent first)", () => {
    const itemA = {
      id: "a",
      title: "A",
      timestamp: 1,
      liked: false,
      image: "a.png",
      criteria: { area: "X", ingredient: "Y" },
    };
    const itemB = {
      id: "b",
      title: "B",
      timestamp: 2,
      liked: true,
      image: "b.png",
      criteria: { area: "Z", ingredient: "W" },
    };

    useHistoryStore.getState().addHistoryItem(itemA);
    useHistoryStore.getState().addHistoryItem(itemB);

    const state = useHistoryStore.getState();
    expect(state.history).toHaveLength(2);
    expect(state.history[0]).toEqual(itemB);
    expect(state.history[1]).toEqual(itemA);
  });
});

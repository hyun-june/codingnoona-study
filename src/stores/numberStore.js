import { create } from "zustand";

const numberStore = create((set) => {
  return {
    num: "0",
    prevNum: "",
    text: "",
    numSelect: (value) =>
      set((state) => ({
        num: state.num === "0" ? String(value) : state.num + String(value),
      })),
    numReset: () => set(() => ({ num: 0 })),
    textSelect: (value) => set(() => ({ text: value })),
  };
});

export default numberStore;

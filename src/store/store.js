import { create } from "zustand";


export const useHostelStore = create((set) => ({
  name: "",
  id: "",
  removeHostel: () => set(() => ({ name: "", id: "" })),
  addHostel: (name, id) => set(() => ({ name, id })),
}));
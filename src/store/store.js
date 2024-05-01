import { create } from "zustand";


export const useHostelStore = create((set) => ({
  userType: "",
  name: "",
  id: "",
  removeHostel: () => set(() => ({ userType: "", name: "", id: "" })),
  addHostel: (userType, name, id) => set(() => ({ userType, name, id })),
}));

export const useAdminStore = create((set) => ({
  userType: "",
  username: "",
  removeAdmin: () => set(() => ({ userType: "", username: "" })),
  addAdmin: (userType, username) => set(() => ({ userType, username })),
}))
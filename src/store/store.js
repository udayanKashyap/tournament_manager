import { create } from "zustand";

export const useHostelStore = create((set) => ({
  loading: true,
  userType: "",
  name: "",
  id: "",
  removeHostel: () =>
    set(() => ({ userType: "", name: "", id: "", loading: false })),
  addHostel: (userType, name, id) =>
    set(() => ({ userType, name, id, loading: false })),
}));

export const useAdminStore = create((set) => ({
  loading: true,
  userType: "",
  username: "",
  removeAdmin: () =>
    set(() => ({ userType: "", username: "", loading: false })),
  addAdmin: (userType, username) =>
    set(() => ({ userType, username, loading: false })),
}));

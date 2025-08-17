import { MenuVo, UserVo } from "@/client";
import { create } from "zustand";

interface UserStore {
  user: UserVo | undefined;
  menus: MenuVo[];
  setUser: (user: UserVo) => void;
  setMenus: (menus: MenuVo[]) => void;
}

const userStore = create<UserStore>((set) => ({
  user: undefined,
  menus: [],
  setUser: (user) => set(() => ({ user })),
  setMenus: (menus) => set(() => ({ menus })),
}));

export default userStore;

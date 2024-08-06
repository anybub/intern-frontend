import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
export interface UserType {
  username: string;
  email: string;
  _id: string;
  role: string;
  address: string;
  token: string;
  branch: string;
  scholarId: string;
}
interface UserStoreType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  resetUser: () => void;
  setHydrated: () => void;
  hydrated: boolean;
}
const useUserStore = create<UserStoreType>()(
  persist(
    immer((set) => ({
      user: null,
      hydrated: false,
      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),
      resetUser: () =>
        set((state) => {
          state.user = null;
        }),
      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "E-ElectionUser",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) {
            state?.setHydrated();
          }
        };
      },
    }
  )
);

export default useUserStore;

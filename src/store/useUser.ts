import { create } from "zustand";
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
}
const useUserStore = create<UserStoreType>()((set) => ({
    user: null,
    setUser: (user) => set({ user: user }, true),
    resetUser: () => set({ user: null }, true),
}));

export default useUserStore;

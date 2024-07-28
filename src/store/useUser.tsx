import {create} from 'zustand';
interface UserType {    
    username: string;
    email: string;
    id: string;
    role: string;
    address: string;
    token: string;
    branch: string;
}
interface UserStore {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useUserStore;
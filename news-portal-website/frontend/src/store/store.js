import { create } from "zustand";

const useStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: (userData, token) =>
        set({
            user: userData,
            token,
            isAuthenticated: true,
        }),

    logout: () =>
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        }),

    updateUser: (userData) =>
        set((state) => ({
            user: { ...state.user, ...userData },
        })),
}));

export default useStore;

import { create } from "zustand";

const useProfileStore = create((set) => ({
  profile: {
    _id: "",
    username: "",
    email: "",
    fullName: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
    _v: 0,
  },
  setProfile: (profile) => set({ profile }),
  updateProfile: (updatedProfile) =>
    set((state) => ({
      profile: { ...state.profile, ...updatedProfile },
    })),
  removeProfile: () =>
    set({
      profile: {
        _id: "",
        username: "",
        email: "",
        fullName: "",
        avatar: "",
        createdAt: "",
        updatedAt: "",
        _v: 0,
      },
    }),
}));

export default useProfileStore;
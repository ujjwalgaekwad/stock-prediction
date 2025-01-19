import { User } from "@/lib/types";
import { create } from "zustand";

interface ProfileState {
  profile: User;
  setProfile: (profile: User) => void;
  updateProfile: (updatedProfile: User) => void;
  removeProfile: () => void;
}

const useProfileStore = create<ProfileState>((set) => ({
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
export type { User };

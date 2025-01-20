import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useProfileStore = create()(
  devtools(
    persist(
      (set) => ({
        profile: {
          _id: "",
          username: "",
          email: "",
          fullName: "",
          avatar: "",
          theme: "",
          createdAt: "",
          updatedAt: "",
          _v: 0,
        },
        setTheme: (theme) =>
          set((state) => ({
            profile: { ...state.profile, theme },
          })),
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
              theme: "",
              createdAt: "",
              updatedAt: "",
              _v: 0,
            },
          }),
      }),
      {
        name: "profile-storage", // Unique name for the storage key
      }
    )
  )
);

export default useProfileStore;

import React from "react";
import { Moon, Sun } from "lucide-react";
import useProfileStore from "../../store/profileStore";
import { syncRootTheme } from "../../utils/themeMethods";

const ThemeToggle = () => {
  const { profile, setTheme } = useProfileStore();

  const toggleTheme = () => {
    const newTheme = profile.theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    syncRootTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border-none bg-primary-light dark:bg-primary-dark text-white transition"
    >
      {profile.theme === "light" ? (
        <Moon size={22} strokeWidth={1.5} className="text-gray-900" />
      ) : (
        <Sun size={22} strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;

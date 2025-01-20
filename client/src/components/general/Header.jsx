import { Link, NavLink } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import appName from "../../constants/appName";
import { Input } from "../ui/input";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="lg:h-[4.5rem] h-16 lg:py-5 pt-4 pb-[1rem] flex justify-between items-center space-x-2 px-5 lg:px-20 border-b-[1px] border-zinc-300 dark:border-zinc-700 select-none">
        <Link
          to="/"
          className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer text-2xl font-helvetica font-semibold flex space-x-2 justify-center items-center"
        >
          <img
            src="/placeholder.png"
            alt="app-logo"
            width="24px"
            className="h-[24px] active:animate-spin"
          />
          {/* Change appName from src/constants/appName.js */}
          <span className="hidden sm:inline">{appName}</span>
        </Link>
        <div className="lg:h-20 h-[4.5rem] lg:py-5 pt-4 pb-[1rem] flex space-x-2 md:w-2/5">
          <div className="w-full relative hidden md:inline-block">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search something..."
              defaultStyling={false}
              className="bg-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <div className="absolute top-2 right-2 border-1 text-zinc-900 bg-zinc-300 border-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 w-fit py-1 px-2 text-xs rounded-md">
              ⌘K
            </div>
          </div>
        </div>
        <div className="text-zinc-600 dark:text-zinc-400 md:flex justify-center items-center hidden space-x-7 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-zinc-900 dark:text-zinc-100" : "hover:text-zinc-900 dark:hover:text-zinc-100"} cursor-pointer transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${isActive ? "text-zinc-900 dark:text-zinc-100" : "hover:text-zinc-900 dark:hover:text-zinc-100"} cursor-pointer transition-colors`
            }
          >
            Dashboard
          </NavLink>
          <ThemeToggle />
          <div className="hidden lg:inline-block">
            <ProfileCard />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

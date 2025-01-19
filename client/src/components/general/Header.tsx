import { Input } from "@/components/ui/input";
import { Link, NavLink } from "react-router-dom";
import appName from "@/constants/appName";
import ProfileCard from "./ProfileCard";
import { useState } from "react";

const Header = () => {

  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="lg:h-[4.5rem] h-16 lg:py-5 pt-4 pb-[1rem] flex justify-between items-center space-x-2 px-5 lg:px-20 border-b-[1px] border-zinc-700 select-none">
        <Link
          to="/"
          className="text-zinc-300 transition-colors cursor-pointer text-2xl font-helvetica font-semibold hover:text-white flex space-x-2 justify-center items-center"
        >
          <img
            src="/placeholder.png"
            alt="app-logo"
            width="24px"
            className="h-[24px] active:animate-spin"
          />
          {/* Change appName from src/constants/appName.ts */}
          <span className="hidden sm:inline">{appName}</span>
        </Link>
        <div className="lg:h-20 h-[4.5rem] lg:py-5 pt-4 pb-[1rem] flex space-x-2 md:w-2/5">
          <div className="w-full relative hidden md:inline-block">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
              placeholder="Search something..."
            />
            <div className="absolute top-2 right-2 border-1 bg-zinc-900 border-zinc-800 text-zinc-300 w-fit py-1 px-2 text-xs rounded-md">
              ⌘K
            </div>
          </div>
        </div>
        <div className="text-zinc-400 md:flex justify-center items-center hidden space-x-7 font-semibold">
          <NavLink to="/" className={({ isActive }) => (`${isActive ? "text-zinc-100" : ""} hover:text-zinc-100 cursor-pointer transition-colors`)}>
            Home
          </NavLink>
          <NavLink to="#" className={({ isActive }) => (`${isActive ? "text-zinc-100" : ""} hover:text-zinc-100 cursor-pointer transition-colors`)}>
            Dashboard
          </NavLink>
          <div className="hidden lg:inline-block">
            <ProfileCard />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

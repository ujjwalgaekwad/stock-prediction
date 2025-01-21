import { Link, NavLink } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import appName from "../../constants/appName";
import ThemeToggler from "./ThemeToggler";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <>
      <nav className="lg:h-[4.5rem] z-50 fixed top-0 w-full bg-zinc-300 dark:bg-zinc-900 h-16 lg:py-5 pt-4 pb-[1rem] flex justify-between items-center space-x-2 px-5 lg:px-20 border-b-[1px] border-zinc-300 dark:border-zinc-700 select-none">
        <div className="flex items-center space-x-6 font-semibold">
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
            <span className="hidden sm:inline">{appName}</span>
          </Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-zinc-900 dark:text-zinc-100" : "hover:text-zinc-900 dark:hover:text-zinc-100"} cursor-pointer transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/whishlist"
            className={({ isActive }) =>
              `${isActive ? "text-zinc-900 dark:text-zinc-100" : "hover:text-zinc-900 dark:hover:text-zinc-100"} cursor-pointer transition-colors`
            }
          >
            Whishlist
          </NavLink>
        </div>
        <div className="text-zinc-600 dark:text-zinc-400 md:flex justify-center items-center hidden space-x-7 font-semibold">
          <SearchBox />
          <ThemeToggler />
          <div className="hidden lg:inline-block">
            <ProfileCard />
          </div>
        </div>
      </nav>
      <div className="h-16 lg:h-[4.5rem]"></div>
    </>
  );
};

export default Header;

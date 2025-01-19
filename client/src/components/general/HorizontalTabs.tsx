import { MdHome } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import useProfileStore from "@/store/profileStore";
import { DrawerClose } from "../ui/drawer";
import { MdFeedback } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
import { handleAxiosError } from "@/utils/handlerAxiosError";
import axios, { AxiosError } from "axios";
import { FaInbox } from "react-icons/fa6";
import { useState } from "react";
import DrawerMenu from "./DrawerMenu";
import { FeedbackForm } from "../Forms";

export default function HorizontalTabs() {
  const { profile } = useProfileStore();

  const [creationDrawer, setCreationDrawer] = useState(false)
  const [profileDrawer, setProfileDrawer] = useState(false)

  const navigate = useNavigate();

  const handleLogout = async () => {
    let loaderId = "";
    toast.loading((t) => {
      loaderId = t.id;
      return "Logging out...";
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/login");
      }
    } catch (error) {
      handleAxiosError(error as AxiosError, navigate);
    } finally {
      toast.dismiss(loaderId);
    }
  };

  return (
    <div className="flex md:justify-between justify-evenly dark:bg-zinc-800 w-full px-5 bg-zinc-200 h-full md:px-12 sm:px-2 sm:!rounded-t-xl items-center sm:w-6/12">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `menu-label !text-3xl !w-auto ${isActive ? "!text-white" : "!text-zinc-500"}`
        }
      >
        <MdHome />
      </NavLink>

      <NavLink
        to="/inbox"
        className={({ isActive }) =>
          `menu-label !text-2xl !w-auto ${isActive ? "!text-white" : "!text-zinc-500"}`
        }
      >
        <FaInbox />
      </NavLink>

      <DrawerMenu
        open={creationDrawer}
        onOpenChange={() => setCreationDrawer(!creationDrawer)}
        title="Create something"
        contentClassName="!pt-0 px-4"
        trigger={
          <label
            htmlFor="create-tab"
            className="menu-label !text-3xl bg-transparent !w-auto !text-zinc-500"
          >
            <FaPlus />
          </label>
        }
      >
        your preferred content
      </DrawerMenu>

      <NavLink
        to="notifications"
        className={({ isActive }) =>
          `menu-label !text-3xl !w-auto ${isActive ? "!text-white" : "!text-zinc-500"}`
        }
      >
        <IoMdNotifications />
      </NavLink>

      <DrawerMenu
        title="Profile"
        open={profileDrawer}
        contentClassName="!pt-0 px-4"
        onOpenChange={() => setProfileDrawer(!profileDrawer)}
        trigger={
          <label
            htmlFor="create-tab"
            className="menu-label !text-3xl bg-transparent !w-auto !text-zinc-500"
          >
            <img
              className="rounded-full !h-8 !w-8 object-cover border-zinc-700 border-2 hover:border-zinc-200 transition-colors"
              src={profile.avatar}
              alt="Profile pic"
            />
          </label>
        }
      >
        <div className="w-full rounded-2xl overflow-hidden space-y-1 flex flex-col">
          <DrawerClose>
            <div className="flex p-2 justify-normal items-center rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
              <span className="w-12 h-12 flex justify-center items-center text-xl">
                <IoPerson />
              </span>
              <span>Profile</span>
            </div>
          </DrawerClose>
          <DrawerMenu
            onClose={() => setProfileDrawer(false)}
            title="Feedback"
            contentClassName="px-4 pt-0 pb-6"
            trigger={
              <div
                className="flex p-2 justify-normal items-center rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
                <span className="w-12 h-12 flex justify-center items-center text-xl">
                  <MdFeedback />
                </span>
                <span>Feedback</span>
              </div>
            }>
            <FeedbackForm setIsOpen={() => { }} />
          </DrawerMenu>
          <DrawerClose>
            <div
              className="flex p-2 justify-normal items-center rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
              <span className="w-12 h-12 flex justify-center items-center text-xl">
                <FaInfoCircle />
              </span>
              <span>About Us</span>
            </div>
          </DrawerClose>
          <DrawerMenu
            onClose={() => setProfileDrawer(false)}
            title="logout"
            contentClassName="!pt-0"
            trigger={
              <div
                className="flex p-2 justify-normal items-center rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
                <span className="w-12 h-12 flex justify-center items-center text-xl">
                  <IoLogOut />
                </span>
                <span>Logout</span>
              </div>
            }
          >
            <div className="px-4 flex flex-col gap-2">
              <button onClick={handleLogout} className="w-full block font-semibold py-2 px-4 rounded-md bg-red-500 hover:bg-red-600">Logout</button>
              <DrawerClose asChild>
                <button className="w-full block font-semibold py-2 px-4 rounded-md bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700">Cancel</button>
              </DrawerClose>
            </div>
          </DrawerMenu>
        </div>
      </DrawerMenu>
    </div>
  );
}

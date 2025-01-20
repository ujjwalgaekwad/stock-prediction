import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useProfileStore from "./store/profileStore";
import axios from "axios";
import { Header, HorizontalTabs, Loading } from "@/components/general";
import { handleAxiosError } from "./utils/handlerAxiosError";
import { initializeSocket } from "./utils/initializeSocket";

const App = () => {
  const { setProfile, profile, setTheme } = useProfileStore();

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = initializeSocket(profile._id);

    socket.on("userConnected", () => {
      console.log("Socket connected");
    });

    socket.on("userDisconnected", (data) => {
      console.log(`User ${data.userId} is offline`);
    });

    return () => {
      socket.disconnect();
    };
  }, [profile._id]);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_SERVER_API_URL}/users/current-user`,
          withCredentials: true,
        });

        if (currentUser.data.data) {
          setProfile(currentUser.data.data);
        }
      } catch (error) {
        handleAxiosError(error, navigate);
      } finally {
        setLoading(false);
      }
    })();

  }, [navigate, setProfile, setTheme]);

  const showBars =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup") ||
    location.pathname.includes("/password-recovery");

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <div className="min-h-screen w-screen text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-900">
      <div
        className={`p-0 w-full min-h-[calc(100vh-env(safe-area-inset-top))]`}
      >
        <div
          className={`w-full ${showBars ? "hidden" : ""}`}
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <Header />
        </div>
        <Outlet />
      </div>
      <div
        className={`fixed z-30 bottom-0 px-0 dark:text-zinc-400 sm:!bg-transparent justify-center items-center flex w-screen h-16 ${
          showBars ? "hidden" : ""
        } lg:hidden`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <HorizontalTabs />
      </div>
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-center"}
        toastOptions={{
          style: {
            // sync profile theme with toast or you also fetch root theme by calling getThemeModeAtRootElem()
            // background: `${theme !== "light" ? "#333" : "#fff"}`,
            // color: `${theme !== "light" ? "#fff" : "#333"}`,
          },
        }}
      />
    </div>
  );
};

export default App;

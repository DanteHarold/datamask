import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const logStore = useAppStore((state) => state.log);
  const updateLog = useAppStore((state) => state.updateLog);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    console.log("handleLogout");
    console.log(logStore);
    const res = await updateLog(new Date(), logStore.log_acceso_id);

    console.log("Res : ", res);
  };

  return (
    <nav className="flex dark:bg-slate-900 items-center relative justify-between mx-auto px-5 py-6 md:w-4/5 lg:w-3/5">
      <div>
        <img src="/Telefonica New.png" className="w-18 h-12" alt="" />
      </div>
      <nav className="sm:gap-3 transition-left ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] delay-150  sm:flex  flex flex-col cursor-pointer absolute min-h-screen -left-48 sm:static w-48 top-0 bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0 dark:bg-slate-900 gap-4">
        <NavLink
          to="/vistas"
          className={({ isActive }) =>
            isActive
              ? "text-customT-bg uppercase font-bold"
              : "dark:text-white uppercase font-bold"
          }
        >
          Vistas
        </NavLink>
        <NavLink
          to="/detalle"
          className={({ isActive }) =>
            isActive
              ? "text-customT-bg uppercase font-bold"
              : "dark:text-white uppercase font-bold"
          }
        >
          Detalle
        </NavLink>
      </nav>
      <div className="flex gap-3 items-center">
        <div
          className="relative h-10 w-10 hover:ring-4 user cursor-pointer ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"
          onClick={toggleMenu}
        >
          {isMenuVisible && (
            <div className="drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3 z-10">
              <ul>
                <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                  <NavLink to="/login-verificar" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="sm:hidden cursor-pointer" id="mobile-toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              className="dark:stroke-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}

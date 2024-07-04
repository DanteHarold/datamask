import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <>
      <header className="m-auto border-b-2 border-customT-bg">
        <Navbar />
      </header>
      <div className="md:w-4/5 m-auto flex flex-col justify-center items-center h-[95vh] ">
        <div className="relative flex flex-col rounded-[20px] w-full max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}

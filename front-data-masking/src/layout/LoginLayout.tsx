import { Outlet } from "react-router-dom";
import ModalPassword from "../components/Login/ModalPassword";
export default function LoginLayout() {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-blue-300 text-black h-screen w-screen">
        <div className="w-full h-full">
          <img
            src="/Rectangle 1.png"
            className="object-fill w-full h-full"
            alt="Imagen de Telefónica"
          />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <Outlet />
      </div>
      <ModalPassword />
    </div>
  );
}

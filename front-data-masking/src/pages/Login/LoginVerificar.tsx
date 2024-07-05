import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppStore } from "../../stores/useAppStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginVerificar() {
  const fetchParamAuth = useAppStore((state) => state.fetchParamAuth);
  const fetchUsuarioIsActive = useAppStore(
    (state) => state.fetchUsuarioIsActive
  );

  const [username, setUsername] = useState("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleVerify = async (e: React.FormEvent<HTMLElement>) => {
    // params();
    e.preventDefault();
    const res = await fetchParamAuth(username);
    if (res.success) {
      MySwal.fire({
        icon: "success",
        title: "En hora buena...",
        text: "Usuario validado",
      }).then(async () => {
        const res = await fetchUsuarioIsActive(username);
        console.log("res en 2do then", res);
        if (res.success) {
          navigate("/login");
        } else {
          navigate("/login-password");
        }
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tu usuario no está registrado",
      }).then(() => {
        console.log("OK");
      });
    }
  };
  return (
    <>
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Ingresa tu Usuario
        </h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Ingresa tu usuario y verifica si estas habilitado
        </h1>
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between"></div>

        <form method="POST" className="space-y-4" onSubmit={handleVerify}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Confirmar
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            No tienes un Usuario?{" "}
            <a href="#" className="text-black hover:underline">
              Click Aqui
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

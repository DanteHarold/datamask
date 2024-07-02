import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function LoginPassword() {
  const usuarioRegister = useAppStore((state) => state.fetchRegister);
  const usuarioRegistrado = useAppStore((state) => state.usuarioRegister);
  const errorMessage = useAppStore((state) => state.errorMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("ERROR");
  const navigate = useNavigate();
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const MySwal = withReactContent(Swal);
    if (password !== confirmPassword) {
      setMessage("Las Contraseñas no Coinciden!");
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      }).then(() => {
        console.log("OK");
      });
      return;
    }
    try {
      const result = await usuarioRegister({
        usuario_tx: username,
        clave_usuario_de: password,
      });
      if (!result.success) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        })
          .then(() => {})
          .finally(() => {});
      } else {
        setMessage("Usuario registrado");
        MySwal.fire({
          icon: "success",
          title: "En hora buena...",
          text: result.message,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      setMessage("Error al registrar el usuario");
      console.error("Error registrando el usuario:", error);
    }
  };
  return (
    <>
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Ya estás a un paso de ingresar!
        </h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Bienvenido, crea tu contraseña para acceder
        </h1>
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between"></div>

        <form
          action="#"
          method="POST"
          className="space-y-4"
          onSubmit={handleRegister}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={confirmPassword}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Crear Contraseña
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            Volver a validar Usuario?{" "}
            <a href="#" className="text-black hover:underline">
              Click Aqui
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

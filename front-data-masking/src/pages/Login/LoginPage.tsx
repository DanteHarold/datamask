import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function LoginPage() {
  const userLogin = useAppStore((state) => state.fetchLogin);
  const postLog = useAppStore((state) => state.fetchLog);
  const paramsUsuario = useAppStore((state) => state.paramsUsuario);
  const sendResetPs = useAppStore((state) => state.sendResetPassword);
  const logAcceso = useAppStore((state) => state.log);
  const [username, setUsername] = useState(paramsUsuario);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const MySwal = withReactContent(Swal);
    try {
      const result = await userLogin({
        usuario_tx: username,
        clave_usuario_de: password,
      });

      if (!result.success) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        });
      } else {
        MySwal.fire({
          icon: "success",
          title: "En hora buena...",
          text: result.message,
        })
          .then(async () => {
            //*Guarda en el localStotage
            localStorage.setItem("datamaskuser", username);
            //*Crea el Log de Acceso
            console.log("date", new Date());
            const data = {
              usuario_tx: username,
              inicio_log_acceso_fh: new Date(),
              fin_log_acceso_fh: new Date(2000, 0, 1),
            };
            //*Guarda el Log De Acceso de la Sesión en el localStotage
            const res = await postLog(data);
            console.log("logAcceso", res);
            console.log("logAcceso", logAcceso);
            localStorage.setItem("datamasklog", JSON.stringify(res.idLog));
          })
          .finally(() => {
            navigate("/vistas");
          });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handlePassword = () => {
    Swal.fire({
      title: "Ingresa tu Correo Electronico",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Ok",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          console.log("login", login);
          const response = await sendResetPs(login);
          if (!response.success) {
            return Swal.showValidationMessage(`
          hola
        `);
          }
        } catch (error) {
          Swal.showValidationMessage(`
        Request failed: ${error}
      `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Revise su correo por favor para reestablecer la contraseña`,
        });
      }
    });
  };
  return (
    <>
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Ingresa al Sistema
        </h1>
        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Ingresa tu usuario y contraseña para acceder al Sistema
        </h1>
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between"></div>

        <form
          action="#"
          method="POST"
          className="space-y-4"
          onSubmit={handleLogin}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              onChange={(e) => setUsername(e.target.value)}
              disabled
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
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            Te has olvidado tu Contraseña?{" "}
            <a
              href="#"
              className="text-black hover:underline"
              onClick={handlePassword}
            >
              Click Aqui
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

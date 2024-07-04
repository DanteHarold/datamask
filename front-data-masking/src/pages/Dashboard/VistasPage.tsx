import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import VistaRow from "../../components/Dashboard/VistaRow";
import { getCurrentDateFormatted } from "../../helpers/dateUtils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
interface SelectedRow {
  duration: number;
  name: string;
  id: number;
  isSelected: Boolean;
}

// Definición del tipo para el estado que contiene todas las filas seleccionadas
type SelectedRowsState = Record<number, SelectedRow>;

export default function VistasPage() {
  const updateEventosByIds = useAppStore((state) => state.removeVistasByIds);
  const fetchParam = useAppStore((state) => state.fetchParam);
  const createVista = useAppStore((state) => state.postVista);
  const fetchVistasNoAsignadas = useAppStore(
    (state) => state.fetchVistasNoAsignadas
  );
  const postEvento = useAppStore((state) => state.postEventos);
  const params = useAppStore((state) => state.params);
  const vistasNoAsignadas = useAppStore((state) => state.vistasNoAsignadas);

  const [userActive, setUserActive] = useState(
    localStorage.getItem("datamaskuser")
  );
  const [userLog, serUserLog] = useState(
    JSON.parse(localStorage.getItem("datamasklog")!)
  );
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(vistasNoAsignadas);
  useEffect(() => {
    setFilteredItems(
      vistasNoAsignadas.filter((item) =>
        item.nombre_vista_acceso_de.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, vistasNoAsignadas]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // useEffect(() => {
  //   fetchVistas();
  // }, []);
  useEffect(() => {
    fetchParam(userActive!);
  }, []);
  useEffect(() => {
    fetchVistasNoAsignadas(userActive!);
  }, []);
  const [selectedRows, setSelectedRows] = useState<SelectedRowsState>({});
  const handleRowChange = (
    id: number,
    name: string,
    isSelected: Boolean,
    duration: number
  ) => {
    setSelectedRows((prev) => {
      const newState = { ...prev }; // Hacer una copia del estado actual

      if (isSelected) {
        // Si está seleccionado, actualizar o agregar el elemento con nuevos valores
        newState[id] = { id, name, isSelected, duration };
      } else {
        // Si no está seleccionado, eliminar el elemento del estado
        delete newState[id];
      }

      return newState; // Devolver el nuevo estado que siempre será un SelectedRowsState
    });
  };

  const handleConfirm = async () => {
    console.log("Selected Rows:", selectedRows);
    const selectedItemsArray = Object.keys(selectedRows)
      .map((key) => parseInt(key, 10))
      .filter((key) => selectedRows[key].isSelected)
      .map((key) => selectedRows[key]);
    console.log(selectedItemsArray);
    try {
      const requests = await Promise.all(
        selectedItemsArray.map((item) =>
          postEvento({
            usuario_tx: userActive!,
            vista_acceso_id: item.id,
            log_acceso_id: userLog,
            solicitud_evento_fh: new Date(),
            tiempo_permiso_evento_fh: item.duration,
            validacion_creacion_fl: 1,
            inicio_evento_fh: new Date(),
            fin_evento_fh: new Date(),
            estado_evento_fl: 1,
            cancelacion_evento_fh: null,
          })
        )
      );
      console.log(selectedItemsArray[0]?.name);
      const res = await createVista(selectedItemsArray[0].name.toString());
      console.log("res CreateVista : ", res);

      console.log("Requests :", requests);
      // Obtener los IDs de los eventos eliminados
      const idsRemoved = selectedItemsArray.map((item) => item.id);
      console.log("idsRemoved", idsRemoved);
      updateEventosByIds(idsRemoved);

      const isSucces = requests.every(
        (resultado) => resultado.success === true
      );

      if (isSucces) {
        MySwal.fire({
          icon: "success",
          title: "En hora buena...",
          text: "Eventos Registrado",
        }).then(async () => {
          navigate("/detalle");
        });
      } else {
        console.log("Al menos un evento no se registró correctamente.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  return (
    <section className="bg-blueGray-50">
      <div className="flex flex-col xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto  ">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Listado de vistas actualmente
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <form className="flex items-center">
                  <label className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search"
                      required
                      value={query}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <div
              style={{ width: "100%", maxHeight: "300px", overflowY: "auto" }}
            >
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Nombre
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Acceso
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Duración
                    </th>
                  </tr>
                </thead>
                {vistasNoAsignadas.length > 0 ? (
                  <tbody>
                    {filteredItems.map((item) => (
                      <VistaRow
                        key={item.vista_acceso_id}
                        vistaNombre={item}
                        onChange={handleRowChange}
                      />
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan={100}
                        className="text-center p-10 font-normal text-gray-500"
                      >
                        No hay vistas disponibles en este momento.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <Button
          className="rounded-md bg-gray-700 py-1.5 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 text-center mx-auto"
          onClick={handleConfirm}
        >
          {vistasNoAsignadas.length > 0 ? "Confirmar" : "Aceptar"}
        </Button>
      </div>
    </section>
  );
}

import { Button, Input } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import DetalleRow from "../../components/Dashboard/DetalleRow";
import { deleteEventos } from "../../services/AppService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface SelectedRow {
  id: number;
  isSelected: Boolean;
}
type SelectedRowsState = Record<number, SelectedRow>;
export default function DetallePage() {
  const fetchEventosByUser = useAppStore((state) => state.fetchEventosByUser);
  const deleteEvento = useAppStore((state) => state.deleteEvento);
  const updateEventosByIds = useAppStore((state) => state.removeEventosByIds);
  const eventos = useAppStore((state) => state.eventos);
  const userActive = localStorage.getItem("datamaskuser");
  useEffect(() => {
    fetchEventosByUser(userActive!);
  }, []);
  const [selectedRows, setSelectedRows] = useState<SelectedRowsState>({});
  const MySwal = withReactContent(Swal);
  const handleRowChange = (id: number, isSelected: Boolean) => {
    setSelectedRows((prev) => {
      const newState = { ...prev }; // Hacer una copia del estado actual

      if (isSelected) {
        // Si está seleccionado, actualizar o agregar el elemento con nuevos valores
        newState[id] = { id, isSelected };
      } else {
        // Si no está seleccionado, eliminar el elemento del estado
        delete newState[id];
      }

      return newState; // Devolver el nuevo estado que siempre será un SelectedRowsState
    });
  };
  const handleConfirm = async () => {
    console.log("Selected Rows:", selectedRows);
    let selectedItemsArray = Object.keys(selectedRows)
      .map((key) => parseInt(key, 10))
      .filter((key) => selectedRows[key].isSelected)
      .map((key) => selectedRows[key]);
    console.log(selectedItemsArray);
    try {
      const requests = await Promise.all(
        selectedItemsArray.map((item) => deleteEvento(item.id))
      );

      // Obtener los IDs de los eventos eliminados
      const idsRemoved = selectedItemsArray.map((item) => item.id);

      // Actualizar el estado con la nueva lista de eventos
      updateEventosByIds(idsRemoved);
      // location.reload();
      console.log(requests);
      const isSucces = requests.every(
        (resultado) => resultado.success === true
      );

      if (isSucces) {
        MySwal.fire({
          icon: "success",
          title: "En hora buena...",
          text: "Eventos Eliminados",
        }).then(async () => {
          console.log("Eventos Eliminados Correctamente");
          setSelectedRows([]);
        });
      } else {
        console.log("Al menos un evento no se eliminó correctamente.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  return (
    <section className="bg-blueGray-50">
      <div className="flex flex-col xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto ">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Detalle
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
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <div
              style={{ width: "100%", maxHeight: "300px", overflowY: "auto" }}
            >
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Nombre
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Duración
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Tiempo Restante
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Eliminar
                    </th>
                  </tr>
                </thead>
                {eventos.length > 0 ? (
                  <tbody>
                    {eventos.map((evento) => (
                      <DetalleRow
                        key={evento.evento_id}
                        evento={evento}
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
                        No hay eventos disponibles en este momento.
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
          {eventos.length > 0 ? "Confirmar" : "Aceptar"}
        </Button>
      </div>
    </section>
  );
}

import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import VistaRow from "../../components/Dashboard/VistaRow";
import { getCurrentDateFormatted } from "../../helpers/dateUtils";

export default function VistasPage() {
  const fetchVistas = useAppStore((state) => state.fetchVistas);
  const fetchParam = useAppStore((state) => state.fetchParam);
  const fetchVistasNoAsignadas = useAppStore(
    (state) => state.fetchVistasNoAsignadas
  );
  const postLog = useAppStore((state) => state.fetchLog);
  const vistas = useAppStore((state) => state.vistas);
  const params = useAppStore((state) => state.params);
  const vistasNoAsignadas = useAppStore((state) => state.vistasNoAsignadas);
  const log = useAppStore((state) => state.log);

  useEffect(() => {
    fetchVistas();
  }, []);
  useEffect(() => {
    fetchParam("user1");
  }, []);
  useEffect(() => {
    fetchVistasNoAsignadas("user1");
  }, []);
  useEffect(() => {
    if (params.usuario_tx) {
      // Solo ejecutar si params.usuario_tx está definido
      console.log("Antes de Post ", params.usuario_tx);
      const data = {
        usuario_tx: params.usuario_tx,
        inicio_log_acceso_fh: "2024-07-01T11:10:32.431Z",
        fin_log_acceso_fh: "2024-07-01T11:10:32.431Z",
      };
      postLog(data);
    }
  }, [params.usuario_tx]);
  const [selectedRows, setSelectedRows] = useState({});
  const handleRowChange = (
    id: number,
    isSelected: Boolean,
    duration: number
  ) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: isSelected ? { id, isSelected, duration } : undefined,
    }));
  };

  const handleConfirm = () => {
    console.log("Selected Rows:", selectedRows);
    console.log("Param", params);
  };
  return (
    <section className="bg-blueGray-50">
      <div className="flex flex-col xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto  ">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Vistas
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
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
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
              <tbody>
                {vistasNoAsignadas.map((vista) => (
                  <VistaRow
                    key={vista.vista_acceso_id}
                    vistaNombre={vista}
                    onChange={handleRowChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Button
          className="rounded-md bg-gray-700 py-1.5 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 text-center mx-auto"
          onClick={handleConfirm}
        >
          Confirmar
        </Button>
      </div>
    </section>
  );
}

import { StateCreator } from "zustand";
import { getVistas, getVistasNoAsignadas } from "../services/AppService";
import { Param, Vistas } from "../types";

export type VistasSliceType = {
  vistas: Vistas;
  vistasNoAsignadas: Vistas;
  fetchVistas: () => Promise<void>;
  fetchVistasNoAsignadas: (id: Param["usuario_tx"]) => Promise<void>;
  removeVistasByIds: (idsToRemove: number[]) => void;
};
export const createVistaSlice: StateCreator<VistasSliceType> = (set) => ({
  vistas: [],
  vistasNoAsignadas: [],
  fetchVistas: async () => {
    const vistas = await getVistas();
    set({ vistas });
  },
  fetchVistasNoAsignadas: async (id) => {
    const vistasNoAsignadas = await getVistasNoAsignadas(id);
    set({ vistasNoAsignadas });
  },
  removeVistasByIds: (idsToRemove) =>
    set((state) => ({
      vistasNoAsignadas: state.vistasNoAsignadas.filter(
        (vista) => !idsToRemove.includes(vista.vista_acceso_id)
      ),
    })),
});

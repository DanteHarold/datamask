import { StateCreator } from "zustand";
import { getVistas } from "../services/AppService";
import { Vistas } from "../types";

export type VistasSliceType = {
  vistas: Vistas;
  fetchVistas: () => Promise<void>;
};
export const createVistaSlice: StateCreator<VistasSliceType> = (set) => ({
  vistas: [],
  fetchVistas: async () => {
    const vistas = await getVistas();
    set({ vistas });
  },
});

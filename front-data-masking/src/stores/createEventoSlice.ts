import { StateCreator } from "zustand";
import { getEventos } from "../services/AppService";
import { Eventos } from "../types";

export type EventosSliceType = {
  eventos: Eventos;
  fetchEventos: () => Promise<void>;
};
export const createEventoSlice: StateCreator<EventosSliceType> = (set) => ({
  eventos: [],
  fetchEventos: async () => {
    const eventos = await getEventos();
    set({ eventos });
  },
});

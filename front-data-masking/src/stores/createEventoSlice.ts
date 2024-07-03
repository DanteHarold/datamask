import { StateCreator } from "zustand";
import {
  deleteEventos,
  getEventos,
  getEventosByUser,
  postEventos,
} from "../services/AppService";
import { Evento, EventoId, EventoPost, Eventos, UsuarioEvento } from "../types";
import axios from "axios";

export type EventosSliceType = {
  eventos: Eventos;
  evento: Evento;
  errorMessage: string;
  fetchEventos: () => Promise<void>;
  postEventos: (
    data: EventoPost
  ) => Promise<{ success: boolean; message: string }>;
  deleteEvento: (
    eventoId: EventoId
  ) => Promise<{ success: boolean; message: string }>;
  fetchEventosByUser: (
    user: UsuarioEvento
  ) => Promise<{ success: boolean; message: string }>;
  removeEventosByIds: (idsToRemove: number[]) => void;
};
export const createEventoSlice: StateCreator<EventosSliceType> = (set) => ({
  eventos: [],
  evento: {} as Evento,
  errorMessage: "",
  fetchEventos: async () => {
    const eventos = await getEventos();
    set({ eventos });
  },
  postEventos: async (data) => {
    try {
      const evento = await postEventos(data);
      console.log("Evento Creado,", evento);
      set({ evento });
      return { success: true, message: "Evento Registrado" };
    } catch (error) {
      let errorMessage = "Error al Registrar Evento";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return { success: false, message: errorMessage };
    }
  },
  deleteEvento: async (eventoId) => {
    try {
      const evento = await deleteEventos(eventoId);
      set({ evento });
      return { success: true, message: "Eventos Eliminados" };
    } catch (error) {
      let errorMessage = "Error al eliminar Eventos";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return { success: false, message: errorMessage };
    }
  },
  fetchEventosByUser: async (user) => {
    try {
      const eventos = await getEventosByUser(user);
      set({ eventos });
      return { success: true, message: "Eventos Encontrados" };
    } catch (error) {
      let errorMessage = "Error al encontrar Eventos";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return { success: false, message: errorMessage };
    }
  },
  removeEventosByIds: (idsToRemove) =>
    set((state) => ({
      eventos: state.eventos.filter(
        (evento) => !idsToRemove.includes(evento.evento_id)
      ),
    })),
});

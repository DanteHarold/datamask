import { StateCreator } from "zustand";
import {
  deleteEventos,
  getEventos,
  getEventosByUser,
  postEventos,
} from "../services/AppService";
import { Evento, EventoId, EventoPost, Eventos, UsuarioEvento } from "../types";

export type EventosSliceType = {
  eventos: Eventos;
  evento: Evento;
  fetchEventos: () => Promise<void>;
  postEventos: (data: EventoPost) => void;
  deleteEvento: (eventoId: EventoId) => void;
  fetchEventosByUser: (user: UsuarioEvento) => void;
};
export const createEventoSlice: StateCreator<EventosSliceType> = (set) => ({
  eventos: [],
  evento: {} as Evento,
  fetchEventos: async () => {
    const eventos = await getEventos();
    set({ eventos });
  },
  postEventos: async (data) => {
    const evento = await postEventos(data);
    console.log("Evento Creado,", evento);
    set({ evento });
  },
  deleteEvento: async (eventoId) => {
    const evento = await deleteEventos(eventoId);
    console.log("Evento Eliminado,", evento);
    set({ evento });
  },
  fetchEventosByUser: async (user) => {
    const eventos = await getEventosByUser(user);
    set({ eventos });
  },
});

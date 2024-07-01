import { StateCreator } from "zustand";
import { getParams } from "../services/AppService";
import { Param, Vistas } from "../types/index";

export type ParamSliceType = {
  params: Param;
  vistasFiltrado: Vistas;
  fetchParam: (id: Param["usuario_tx"]) => void;
};
export const createParamSlice: StateCreator<ParamSliceType> = (set) => ({
  params: {} as Param,
  vistasFiltrado: [],
  fetchParam: async (id) => {
    const params = await getParams(id);
    set({ params });
  },
});

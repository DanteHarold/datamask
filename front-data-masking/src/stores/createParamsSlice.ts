import { StateCreator } from "zustand";
import { getParams, getParamsAuth } from "../services/AppService";
import { Param, Vistas } from "../types/index";
import { persist } from "zustand/middleware";
import axios from "axios";

export type ParamSliceType = {
  params: Param;
  paramsUsuario: Param["nombre_usuario_de"];
  paramsUsuarioIsValid: Boolean;
  vistasFiltrado: Vistas;
  errorMessage: string;
  fetchParam: (
    id: Param["usuario_tx"]
  ) => Promise<{ success: boolean; message: string }>;
  fetchParamAuth: (
    usuario: Param["usuario_tx"]
  ) => Promise<{ success: boolean; message: string }>;
};
// Asegúrate de que el tipo retornado por `StateCreator` esté correctamente tipado
const paramSliceCreator: StateCreator<ParamSliceType> = (set) => ({
  params: {} as Param,
  paramsUsuario: "",
  paramsUsuarioIsValid: false,
  vistasFiltrado: [],
  errorMessage: "",
  fetchParam: async (id) => {
    try {
      const params = await getParams(id);
      set({ paramsUsuario: params?.usuario_tx, params });
      return { success: true, message: "Usuario registrado con éxito" };
    } catch (error) {
      let errorMessage = "Error al registrar el usuario";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return { success: false, message: errorMessage };
    }
  },
  fetchParamAuth: async (usuario) => {
    try {
      const params = await getParamsAuth(usuario);
      if (params) {
        set({ paramsUsuario: usuario, paramsUsuarioIsValid: Boolean(params) });
      } else {
        return {
          success: Boolean(params),
          message: "Usuario tiene Validación",
        };
      }
      return {
        success: Boolean(params),
        message: "Usuario no tiene Validación",
      };
    } catch (error) {
      let errorMessage = "Error al Validar Usuario";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return { success: false, message: errorMessage };
    }
  },
});

export const createParamSlice = persist(paramSliceCreator, {
  name: "user-settings", // nombre para el almacenamiento en localStorage
  getStorage: () => localStorage, // Definir localStorage como almacenamiento
});

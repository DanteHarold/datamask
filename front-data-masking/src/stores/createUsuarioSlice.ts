import { StateCreator } from "zustand";
import { postLogin, postRegister } from "../services/AppService";
import { Usuario, UsuarioLogin, UsuarioRegister } from "../types";
import axios from "axios";

export type UsuariosSliceType = {
  usuarioRegister: UsuarioRegister;
  usuarioLogueado: UsuarioLogin;
  errorMessage: string;
  fetchRegister: (
    usuario: Usuario
  ) => Promise<{ success: boolean; message: string }>;
  fetchLogin: (
    usuario: Usuario
  ) => Promise<{ success: boolean; message: string }>;
};
export const createUsuarioSlice: StateCreator<UsuariosSliceType> = (set) => ({
  usuarioRegister: {} as UsuarioRegister,
  usuarioLogueado: {} as UsuarioLogin,
  errorMessage: "",
  fetchRegister: async (usuario) => {
    try {
      const usuarioRegister = await postRegister(usuario);
      set({ usuarioRegister, errorMessage: "" });
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
  fetchLogin: async (usuario) => {
    try {
      const usuarioLogueado = await postLogin(usuario);
      set({ usuarioLogueado });
      return { success: true, message: "Inicio de sesión exitoso" };
    } catch (error) {
      let errorMessage = "Error al iniciar sesión";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return { success: false, message: errorMessage };
    }
  },
});

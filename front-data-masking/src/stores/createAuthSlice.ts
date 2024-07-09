import { StateCreator } from "zustand";
import {
  postLog,
  putLog,
  resetPassword,
  sendResetPassword,
} from "../services/AppService";
import { Log, LogPost } from "../types/index";
import axios from "axios";

export type AuthSliceType = {
  log: Log;
  errorMessage: string;
  sendResetPassword: (data: string) => Promise<{
    success: boolean;
    message: string;
    idLog: number | undefined;
  }>;
  resetPassword: (
    token: string,
    new_password: string
  ) => Promise<{
    success: boolean;
    message: string;
    idLog: number | undefined;
  }>;
};
export const createAuthSlice: StateCreator<AuthSliceType> = (set) => ({
  log: {} as Log,
  errorMessage: "",
  sendResetPassword: async (data) => {
    try {
      const log = await sendResetPassword(data);
      //   set({ log });
      return {
        success: true,
        message: "Enviado con exito!",
        idLog: log?.log_acceso_id,
      };
    } catch (error) {
      let errorMessage = "Error al reestablecer contraseña";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return {
        success: false,
        message: errorMessage,
        idLog: 0,
      };
    }
  },
  resetPassword: async (token, new_password) => {
    try {
      const log = await resetPassword(token, new_password);
      console.log("resetPassword Res log", log);
      //   set({ log });
      return {
        success: true,
        message: "Contraseña Reestablecida",
        idLog: log?.log_acceso_id,
      };
    } catch (error) {
      let errorMessage = "Error al enviar Correo de recuperación";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || errorMessage;
      }
      set({ errorMessage });
      return {
        success: false,
        message: errorMessage,
        idLog: 0,
      };
    }
  },
});

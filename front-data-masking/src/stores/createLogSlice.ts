import { StateCreator } from "zustand";
import { postLog } from "../services/AppService";
import { Log, LogPost } from "../types/index";
import axios from "axios";

export type LogSliceType = {
  log: Log;
  errorMessage: string;
  fetchLog: (
    data: LogPost
  ) => Promise<{
    success: boolean;
    message: string;
    idLog: number | undefined;
  }>;
};
export const createLogSlice: StateCreator<LogSliceType> = (set) => ({
  log: {} as Log,
  errorMessage: "",
  fetchLog: async (data) => {
    try {
      const log = await postLog(data);
      console.log("Slice Res log", log);
      set({ log });
      console.log("Slice log", log);
      return {
        success: true,
        message: "Log de Acceso Registrado",
        idLog: log?.log_acceso_id,
      };
    } catch (error) {
      let errorMessage = "Error al Registrar Log de Acceso";
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

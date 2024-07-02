import { StateCreator } from "zustand";
import { postLog } from "../services/AppService";
import { Log, LogPost } from "../types/index";

export type LogSliceType = {
  log: Log;
  fetchLog: (data: LogPost) => void;
};
export const createLogSlice: StateCreator<LogSliceType> = (set) => ({
  log: {} as Log,
  fetchLog: async (data) => {
    const log = await postLog(data);
    console.log("LOGGG,", log);
    set({ log });
  },
});

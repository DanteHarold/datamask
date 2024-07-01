import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { VistasSliceType, createVistaSlice } from "./createVistaSlice";
import { EventosSliceType, createEventoSlice } from "./createEventoSlice";
import { ParamSliceType, createParamSlice } from "./createParamsSlice";
import { LogSliceType, createLogSlice } from "./createLogSlice";

export const useAppStore = create<
  VistasSliceType & EventosSliceType & ParamSliceType & LogSliceType
>()(
  devtools((...a) => ({
    ...createVistaSlice(...a),
    ...createEventoSlice(...a),
    ...createParamSlice(...a),
    ...createLogSlice(...a),
  }))
);

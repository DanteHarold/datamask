import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { VistasSliceType, createVistaSlice } from "./createVistaSlice";
import { EventosSliceType, createEventoSlice } from "./createEventoSlice";
import { ParamSliceType, createParamSlice } from "./createParamsSlice";
import { LogSliceType, createLogSlice } from "./createLogSlice";
import { UsuariosSliceType, createUsuarioSlice } from "./createUsuarioSlice";
import { AuthSliceType, createAuthSlice } from "./createAuthSlice";

export const useAppStore = create<
  VistasSliceType &
    EventosSliceType &
    ParamSliceType &
    LogSliceType &
    UsuariosSliceType &
    AuthSliceType
>()(
  devtools((...a) => ({
    ...createVistaSlice(...a),
    ...createEventoSlice(...a),
    ...createParamSlice(...a),
    ...createLogSlice(...a),
    ...createUsuarioSlice(...a),
    ...createAuthSlice(...a),
  }))
);

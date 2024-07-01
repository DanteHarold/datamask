import { z } from "zod";
import {
  EventoAPIResponsSchema,
  EventosAPIResponseSchema,
  LogAPIResponsSchema,
  ParamAPIResponsSchema,
  VistaAPIResponsSchema,
  VistasAPIResponseSchema,
} from "../schemas/app.schema";

export type Vistas = z.infer<typeof VistasAPIResponseSchema>;
export type Vista = z.infer<typeof VistaAPIResponsSchema>;
export type Eventos = z.infer<typeof EventosAPIResponseSchema>;
export type Evento = z.infer<typeof EventoAPIResponsSchema>;
export type Param = z.infer<typeof ParamAPIResponsSchema>;
export type Log = z.infer<typeof LogAPIResponsSchema>;

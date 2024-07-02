import { z } from "zod";
import {
  EventoAPIResponsSchema,
  EventoAPIResponsSchemaPost,
  EventosAPIResponseSchema,
  LogAPIResponsSchema,
  LogAPIResponsSchemaPost,
  ParamAPIResponsSchema,
  UsuarioAPIResponsSchema,
  UsuarioAPIResponsSchemaLogin,
  UsuarioAPIResponsSchemaRegister,
  VistaAPIResponsSchema,
  VistasAPIResponseSchema,
} from "../schemas/app.schema";

export type Usuario = z.infer<typeof UsuarioAPIResponsSchema>;
export type UsuarioEvento = Usuario["usuario_tx"];
export type UsuarioRegister = z.infer<typeof UsuarioAPIResponsSchemaRegister>;
export type UsuarioLogin = z.infer<typeof UsuarioAPIResponsSchemaLogin>;
export type Vistas = z.infer<typeof VistasAPIResponseSchema>;
export type Vista = z.infer<typeof VistaAPIResponsSchema>;
export type Eventos = z.infer<typeof EventosAPIResponseSchema>;
export type Evento = z.infer<typeof EventoAPIResponsSchema>;
export type EventoPost = z.infer<typeof EventoAPIResponsSchemaPost>;
export type Param = z.infer<typeof ParamAPIResponsSchema>;
export type LogPost = z.infer<typeof LogAPIResponsSchemaPost>;
export type Log = z.infer<typeof LogAPIResponsSchema>;
export type EventoId = Evento["evento_id"];

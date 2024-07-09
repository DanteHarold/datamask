import { z } from "zod";

//* Usuarios -> Usuarios que se crean cuando le dan acceso por Remedy
export const UsuarioAPIResponsSchema = z.object({
  usuario_tx: z.string(),
  clave_usuario_de: z.string(),
});
export const UsuarioAPIResponsSchemaRegister = z.object({
  usuario_tx: z.string(),
});
export const UsuarioAPIResponsSchemaLogin = z.object({
  message: z.string(),
  user: z.string(),
});
export const UsuariosAPIResponseSchema = z.object({
  usuarios: z.array(UsuarioAPIResponsSchema),
});

//* Params -> Usuario detalle, tiene acceso el propio Remedy
export const ParamAPIResponsSchema = z.object({
  usuario_tx: z.string(),
  nombre_usuario_de: z.string(),
  apellidos_usuario_de: z.string(),
  autorizacion_usuario_fl: z.number(),
  fecha_alta_usuario_fh: z.string(),
  rol_usuario_de: z.string(),
});
export const ParamAPIResponsSchemaAuth = z.boolean();

export const ParamsAPIResponseSchema = z.object({
  params: z.array(ParamAPIResponsSchema),
});

//* Vistas -> Las vistas que se listas en el dashboard ('Vistas')
export const VistaAPIResponsSchema = z.object({
  vista_acceso_id: z.number(),
  nombre_vista_acceso_de: z.string(),
});
export const VistasAPIResponseSchema = z.array(VistaAPIResponsSchema);

//* Eventos -> Eventos que se muestra el el Dashboard ('Detalle')
export const EventoAPIResponsSchema = z.object({
  evento_id: z.number(),
  usuario_tx: z.string(),
  vista_acceso_id: z.number(),
  log_acceso_id: z.number(),
  solicitud_evento_fh: z.string(),
  tiempo_permiso_evento_fh: z.number(),
  validacion_creacion_fl: z.number(),
  inicio_evento_fh: z.string(),
  fin_evento_fh: z.string(),
  estado_evento_fl: z.number(),
  cancelacion_evento_fh: z.string().nullable(),
});
export const EventoAPIResponsSchemaGet = z.object({
  evento_id: z.number(),
  usuario_tx: z.string(),
  vista_acceso_id: z.number(),
  log_acceso_id: z.number(),
  solicitud_evento_fh: z.string(),
  tiempo_permiso_evento_fh: z.number(),
  validacion_creacion_fl: z.number(),
  inicio_evento_fh: z.string(),
  fin_evento_fh: z.string(),
  estado_evento_fl: z.number(),
  cancelacion_evento_fh: z.string().nullable(),
  nombre_vista_acceso_de: z.string(),
});
export const EventoAPIResponsSchemaPost = z.object({
  usuario_tx: z.string(),
  vista_acceso_id: z.number(),
  log_acceso_id: z.number(),
  solicitud_evento_fh: z.date(),
  tiempo_permiso_evento_fh: z.number(),
  validacion_creacion_fl: z.number(),
  inicio_evento_fh: z.date(),
  fin_evento_fh: z.date(),
  estado_evento_fl: z.number(),
  cancelacion_evento_fh: z.string().nullable(),
});
export const EventosAPIResponseSchema = z.array(EventoAPIResponsSchema);
export const EventosAPIResponseSchemaGet = z.array(EventoAPIResponsSchemaGet);
//* Log_Accesos -> Log que registra la fecha de acceso y salida ('Detalle')
export const LogAPIResponsSchema = z.object({
  log_acceso_id: z.number(),
  usuario_tx: z.string(),
  inicio_log_acceso_fh: z.string(),
  fin_log_acceso_fh: z.string(),
});
export const LogAPIResponsSchemaPost = z.object({
  usuario_tx: z.string(),
  inicio_log_acceso_fh: z.date(),
  fin_log_acceso_fh: z.date().nullable(),
});
export const LogsAPIResponseSchema = z.array(LogAPIResponsSchema);

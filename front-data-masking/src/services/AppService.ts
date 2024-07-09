import axios from "axios";
import {
  EventoAPIResponsSchema,
  EventosAPIResponseSchema,
  EventosAPIResponseSchemaGet,
  LogAPIResponsSchema,
  ParamAPIResponsSchema,
  ParamAPIResponsSchemaAuth,
  UsuarioAPIResponsSchemaLogin,
  UsuarioAPIResponsSchemaRegister,
  VistasAPIResponseSchema,
} from "../schemas/app.schema";
import {
  EventoId,
  EventoPost,
  Log,
  LogPost,
  Param,
  Usuario,
  UsuarioEvento,
  Vista,
} from "../types";

export async function postRegister(usuario: Usuario) {
  const url = "http://localhost:8000/api/v1/usuarios/register/";
  const { data } = await axios.post(url, usuario);
  const result = UsuarioAPIResponsSchemaRegister.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function postLogin(usuario: Usuario) {
  const url = "http://localhost:8000/api/v1/usuarios/login/";
  const { data } = await axios.post(url, usuario);
  const result = UsuarioAPIResponsSchemaLogin.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function postUsuarioActive(usuario: Usuario["usuario_tx"]) {
  const url = `http://localhost:8000/api/v1/usuarios/${usuario}`;
  const { data } = await axios.get(url);
  console.log("data", data);
  const result = UsuarioAPIResponsSchemaRegister.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getVistas() {
  const url = "http://localhost:8000/api/v1/vistas_accesos/";
  const { data } = await axios(url);
  const result = VistasAPIResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}
export async function createVistas(view_name: Vista["nombre_vista_acceso_de"]) {
  const url = `http://localhost:8000/api/v1/eventos/create_view/?view_name=${view_name}`;
  const { data } = await axios.post(url, { view_name: view_name });
  console.log(data);
  const result = VistasAPIResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getVistasNoAsignadas(user: Param["usuario_tx"]) {
  const url = `http://localhost:8000/api/v1/vistas_accesos/vistas_no_asignadas/${user}`;
  const { data } = await axios(url);
  const result = VistasAPIResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getEventos() {
  const url = "http://localhost:8000/api/v1/eventos/";
  const { data } = await axios(url);
  console.log("data", data);
  const result = EventosAPIResponseSchemaGet.safeParse(data);
  console.log("result", result);
  if (result.success) {
    return result.data;
  }
}
export async function getEventosByUser(user: UsuarioEvento) {
  const url = `http://localhost:8000/api/v1/eventos/eventos/${user}`;
  const { data } = await axios(url);
  console.log("data", data);
  const result = EventosAPIResponseSchemaGet.safeParse(data);
  console.log("result", result);
  if (result.success) {
    return result.data;
  }
}

export async function getParams(user: Param["usuario_tx"]) {
  const url = `http://localhost:8000/api/v1/params/${user}`;
  const { data } = await axios(url);
  const result = ParamAPIResponsSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}
export async function getParamsAuth(user: Param["usuario_tx"]) {
  const url = `http://localhost:8000/api/v1/params/verificar_autorizacion/${user}`;
  const { data } = await axios.post(url, { user });
  console.log("getParamsAuth:", data);
  const result = ParamAPIResponsSchemaAuth.safeParse(data);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}

export async function postLog(log: LogPost) {
  const url = `http://localhost:8000/api/v1/log_accesos/`;
  const { data } = await axios.post(url, log);
  console.log(data);
  const result = LogAPIResponsSchema.safeParse(data);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}
export async function putLog(
  fin_log_acceso_fh: LogPost["fin_log_acceso_fh"],
  logId: Log["log_acceso_id"]
) {
  const url = `http://localhost:8000/api/v1/log_accesos/${logId}`;
  const { data } = await axios.put(url, { fin_log_acceso_fh });
  console.log(data);
  const result = LogAPIResponsSchema.safeParse(data);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}

export async function postEventos(evento: EventoPost) {
  const url = `http://localhost:8000/api/v1/eventos/`;
  console.log(evento);
  const { data } = await axios.post(url, evento);
  console.log(data);
  const result = EventoAPIResponsSchema.safeParse(data);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}

export async function deleteEventos(evento: EventoId) {
  const url = `http://localhost:8000/api/v1/eventos/${evento}`;
  const { data } = await axios.delete(url);
  console.log(data);
  const result = EventoAPIResponsSchema.safeParse(data);
  console.log("Result deleteEventos : ", result);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}

export async function sendResetPassword(email: string) {
  const url = `http://localhost:8000/api/v1/auth/password-reset-request`;
  const { data } = await axios.post(url, { email });
  console.log(data);
  const result = EventoAPIResponsSchema.safeParse(data);
  console.log("Result deleteEventos : ", result);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}
export async function resetPassword(token: string, new_password: string) {
  const url = `http://localhost:8000/api/v1/auth/reset-password/?token=${token}&new_password=${new_password}`;
  const { data } = await axios.post(url, { token, new_password });
  console.log(data);
  const result = EventoAPIResponsSchema.safeParse(data);
  console.log("Result deleteEventos : ", result);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}

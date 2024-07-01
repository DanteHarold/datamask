import axios from "axios";
import {
  EventosAPIResponseSchema,
  LogAPIResponsSchema,
  ParamAPIResponsSchema,
  VistasAPIResponseSchema,
} from "../schemas/app.schema";
import { Log, Param } from "../types";

export async function getVistas() {
  const url = "http://localhost:8000/api/v1/vistas_accesos/";
  const { data } = await axios(url);
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
  const result = EventosAPIResponseSchema.safeParse(data);
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

export async function postLog(log: Log) {
  const url = `http://localhost:8000/api/v1/log_accesos/`;
  console.log(log);
  const response = await axios.post(url, log);
  const result = LogAPIResponsSchema.safeParse(response);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}

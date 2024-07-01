import { Input } from "@headlessui/react";
import { Evento } from "../../types";
type EventosProps = {
  evento: Evento;
};
export default function DetalleRow({ evento }: EventosProps) {
  return (
    <>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700 text-center">
          {evento.vista_acceso_id}
        </th>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
          <p>
            {" "}
            {evento.tiempo_permiso_evento_fh} {} min.
          </p>
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
          <p>{evento.solicitud_evento_fh}</p>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-center">
          <Input type="checkbox" className=""></Input>
        </td>
      </tr>
    </>
  );
}

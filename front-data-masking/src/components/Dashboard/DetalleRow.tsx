import { Input } from "@headlessui/react";
import { EventoGet } from "../../types";
import { useState } from "react";
type EventosProps = {
  evento: EventoGet;
  onChange: (id: number, isSelected: boolean) => void;
};
export default function DetalleRow({ evento, onChange }: EventosProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    onChange(evento.evento_id, e.target.checked);
  };
  return (
    <>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700 text-center">
          {evento.nombre_vista_acceso_de}
          {"_DP"}
        </th>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
          <p>
            {" "}
            {evento.tiempo_permiso_evento_fh} {} hrs.
          </p>
        </td>
        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
          <p>{evento.solicitud_evento_fh}</p>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-center">
          <Input
            type="checkbox"
            className=""
            onChange={handleCheckboxChange}
          ></Input>
        </td>
      </tr>
    </>
  );
}

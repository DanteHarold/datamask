import { Input } from "@headlessui/react";
import { Vista } from "../../types";
import { useState } from "react";

type VistaProps = {
  vistaNombre: Vista;
  onChange: (id: number, isSelected: boolean, duration: number) => void;
};

export default function VistaRow({ vistaNombre, onChange }: VistaProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    onChange(vistaNombre.vista_acceso_id, e.target.checked, duration);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number(e.target.value));
    if (isSelected) {
      onChange(vistaNombre.vista_acceso_id, isSelected, Number(e.target.value));
    }
  };
  return (
    <>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700 text-center">
          {vistaNombre.nombre_vista_acceso_de}
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-center">
          <Input type="checkbox" className="" onChange={handleCheckboxChange} />
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <select
            id="category"
            name="category"
            className="p-3 w-full rounded-lg focus:outline-none"
            onChange={handleSelectChange}
          >
            <option value="">--- Seleccione ---</option>
            <option value={1}>1 Hora</option>
            <option value={2}>2 Horas</option>
            <option value={3}>3 Horas</option>
            <option value={4}>4 Horas</option>
          </select>
        </td>
      </tr>
    </>
  );
}

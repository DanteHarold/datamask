import { Input } from "@headlessui/react";
import { Vista } from "../../types";
import { useState } from "react";

type VistaProps = {
  vistaNombre: Vista;
  onChange: (
    id: number,
    name: string,
    isSelected: boolean,
    duration: number
  ) => void;
};

export default function VistaRow({ vistaNombre, onChange }: VistaProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    onChange(
      vistaNombre.vista_acceso_id,
      vistaNombre.nombre_vista_acceso_de,
      isSelected,
      duration
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number(e.target.value));
    if (isSelected) {
      onChange(
        vistaNombre.vista_acceso_id,
        vistaNombre.nombre_vista_acceso_de,
        isSelected,
        duration
      );
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
            <option value="">--- Seleccione hrs ---</option>
            <option value={12}>12 hrs</option>
            <option value={24}>24 hrs</option>
            <option value={36}>36 hrs</option>
            <option value={48}>48 hrs</option>
            <option value={72}>72 hrs</option>
          </select>
        </td>
      </tr>
    </>
  );
}

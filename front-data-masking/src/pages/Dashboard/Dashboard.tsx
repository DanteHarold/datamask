import { useState } from "react";
import Table from "../../components/Table";
import TableDetalle from "../../components/TableDetalle";

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState(false);
  return <div>{selectedPage ? <Table /> : <TableDetalle />}</div>;
}

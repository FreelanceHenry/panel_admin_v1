import TableGeneric from "../table/TableGeneric";
import { orderHeaders } from "../table/OrderHeaders/header";
import { DataTable } from "./types";

type Props = {};

const OrderView = (props: Props) => {
  const data: DataTable[] = [
    { id: 1, typeAmount: "2", total: 3900, status: "PENDIENTE" },
    { id: 2, typeAmount: "2", total: 3900, status: "PENDIENTE" },
    { id: 3, typeAmount: "2", total: 3900, status: "PENDIENTE" },
    { id: 4, typeAmount: "2", total: 3900, status: "PENDIENTE" },
  ];
  return (
    <div>
      <TableGeneric TableHeaders={orderHeaders} data={data} />
    </div>
  );
};

export default OrderView;

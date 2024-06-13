import TableGeneric from "../table/TableGeneric";
import { orderHeaders } from "../table/OrderHeaders/header";
import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAllOrders, getOrders } from "@/Slices/Orders/OrderSlice";
import { Button } from "../ui/button";
import { DataTable } from "./types";
import ToogleViewTable from "../table/components/ToogleViewTable";

const OrderView = () => {
  const dispatch = useAppDispatch();

  const order = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const componentAction = useCallback(() => {
    return (
      <div className="flex gap-5 items-center w-44 h-14">
        <select className="  rounded-lg p-4 focus:outline-none">
          <option value="VERIFICACION">VERIFICACION</option>
          <option value="BODEGA">BODEGA</option>
          <option value="DESPACHO">DESPACHO</option>
          <option value="ENTREGADO">ENTREGADO</option>
        </select>
        <Button
          variant={"colorPrimary"}
          className="w-full h-full hover:bg-white hover:text-blue-500"
        >
          Cambiar Estado
        </Button>
      </div>
    );
  }, []);

  const actionOrdersRow = useMemo(
    () => [
      {
        componentAction,
      },
    ],
    [componentAction]
  );

  const optionsTable = {
    Expansive: {
      isExpansive: true,
      componentToogleView: (row: DataTable) =>  <ToogleViewTable item={row}/>
    },
    action: actionOrdersRow,
  };

  return (
    <div>
      <TableGeneric
        TableHeaders={orderHeaders}
        data={order}
        options={optionsTable}
      />
    </div>
  );
};

export default OrderView;

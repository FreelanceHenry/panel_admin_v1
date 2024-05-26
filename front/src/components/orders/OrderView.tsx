import TableGeneric from "../table/TableGeneric";
import { orderHeaders } from "../table/OrderHeaders/header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getAllOrders, getOrders } from "@/Slices/Orders/OrderSlice";

const OrderView = () => {
  const dispatch = useAppDispatch();

  const order = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      <TableGeneric TableHeaders={orderHeaders} data={order} />
    </div>
  );
};

export default OrderView;

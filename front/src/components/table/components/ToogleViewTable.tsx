import { DataTable } from "@/components/orders/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { URL_HOST_PROD } from "@/lib/utils";
import {
  getOrdersInfo,
  getProductAndQuotes,
  loadingOrderInfo,
} from "@/Slices/Orders/OrderSlice";
import { useEffect, useState } from "react";

type Props = {
  item: DataTable;
};

const ToogleViewTable = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const infoOrder = useAppSelector(getOrdersInfo);
  const loading = useAppSelector(loadingOrderInfo);
  useEffect(() => {
    item && dispatch(getProductAndQuotes(item?.orders_id));
  }, [item]);

  return loading ? (
    <div className="flex items-center justify-center w-full h-full ">
      <span className="loader2"></span>
    </div>
  ) : (
    <div className="h-auto overflow-hidden overflow-y-auto  ">
      <div className="h-full w-full ">
        {item?.payment_type_name === "CREDIT" ? (
          <div className="flex flex-col  w-full h-full gap-4 overflow-hidden">
            <div className="w-full h-24 flex items-center justify-around bg-[#5d60ef] text-white p-4 rounded-xl">
              <div className="flex items-center gap-2">
                Estado:
                <span className="text-2xl text-green-300">
                  PENDIENTE DE PAGOS
                </span>
              </div>
              <hr className="h-full w-[1px] bg-white" />
              <div className="flex items-center gap-2">
                Tipo de venta:
                <span className="text-2xl text-green-300">CREDITO</span>
              </div>
              <hr className="h-full w-[1px] bg-white" />
              <div className="flex items-center gap-2">
                Total a pagar:
                <span className="text-2xl text-green-300">$30 USD</span>
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="flex  items-center justify-center w-full ">
                <div className="flex w-full h-full mt-4 gap-6 items-center justify-center flex-wrap">
                  {infoOrder?.products.map((product) => (
                    <div
                      className="text-xl flex flex-col items-center"
                      key={product?.products_id}
                    >
                      <div className="w-24 h-24">
                        <img
                          src={`${URL_HOST_PROD}/uploads/${product.file_name}`}
                          alt={product.products_name}
                        />
                      </div>
                      {product.products_name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center w-full ">
                <div className="flex w-full items-center justify-around  bg-gray-200 p-4 rounded-xl">
                  <p>Cuota 1</p>
                  <p>Estado: PAGADA</p>
                  <p>fecha de pago: 15-05-2024 </p>
                </div>
                <div className="flex w-full items-center justify-around  bg-gray-200 p-4 rounded-xl">
                  <p>Cuota 2</p>
                  <p>Estado: PENDIENTE</p>
                  <p>fecha de Vigente: 15-06-2024 </p>
                </div>
                <div className="flex w-full items-center justify-around  bg-gray-200 p-4 rounded-xl">
                  <p>Cuota 3</p>
                  <p>Estado: PENDIENTE</p>
                  <p>fecha de Vigente: 15-07-2024 </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ToogleViewTable;

import React, { useState } from "react";
import OrderView from "../components/orders/OrderView";
import VerifyPayment from "../components/orders/VerifyPayment";

type Props = {};

interface StepInterface {
  id: number;
  title: string;
  viewComponent: JSX.Element;
}

const Orders = (props: Props) => {
  const [currentTab, setCurrentTab] = useState("Ordenes");
  const [step, setStep] = useState<StepInterface[]>([
    {
      id: 1,
      title: "Ordenes",
      viewComponent: <OrderView />,
    },
    {
      id: 2,
      title: "Verificar pago",
      viewComponent: <VerifyPayment />,
    },
  ]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    const name = (e.target as HTMLButtonElement).name;
    setCurrentTab(name);
  };

  return (
    <div className=" h-full w-full flex items-center justify-center">
      <div className="flex flex-col h-[90%] w-[90%] ">
        <div className="flex h-14 gap-1 w-full">
          <button
            className={`${
              currentTab === "Ordenes" ? "bg-[#5d60ef]" : "bg-[#8a8ce4]"
            } p-4 text-white rounded-t-xl`}
            name="Ordenes"
            onClick={handleClick}
          >
            Ordenes
          </button>
          <button
            className={`${
              currentTab === "Verificar pago" ? "bg-[#5d60ef]" : "bg-[#8a8ce4]"
            } p-4 text-white rounded-t-xl`}
            name="Verificar pago"
            onClick={handleClick}
          >
            Verificar pago
          </button>
        </div>
        <div className="flex-1 w-full shadow-xl bg-[#ededf0] ">
          {step.map(
            (step) =>
              step.title === currentTab && (
                <section key={step.id} className="w-full h-full">
                  {" "}
                  {step.viewComponent}
                </section>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;

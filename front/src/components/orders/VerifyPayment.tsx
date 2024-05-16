import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { bankCode, URL_HOST_DEV, URL_HOST_PROD } from "../../lib/utils";
import { BankApiRequest, BankResponse } from "./types";
import { useApiGerneric } from "@/hooks/useBankApi";

type Props = {};

const VerifyPayment = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<BankResponse>({
    message: "",
    code: 0,
  });

  const [data, setData] = useState<BankApiRequest>({
    cedulaPagador: "",
    telefonoPagador: "",
    telefonoDestino: "04241708810",
    referencia: "",
    fechaPago: "",
    importe: "",
    bancoOrigen: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value.trim() });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await useApiGerneric(`${URL_HOST_PROD}/api/v1/payment/mobile`, data)
      .then((res) => {
        {
          setResponse({ message: res.message, code: res.code });
        }
      })
      .catch((err) => {
        setResponse({ message: err.message, code: err.code });
      })
      .finally(() => setLoading(false)
    
    );
  };

  return (
    <div className="flex  p-2 w-full h-full">
      <div className="flex w-full h-full  justify-center">
        <div className="flex-1 flex w-full h -full items-center justify-center">
          <form
            className="space-y-8 flex flex-col items-stretch justify-between"
            onSubmit={handleSubmit}
          >
            <div className="">
              <Label>
                Cedula Pagador <span className="text-md text-red-500">*</span>
              </Label>
              <Input
                placeholder="Ej: V29460683"
                className="rounded-lg border-purple-800"
                name="cedulaPagador"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label>
                Telefono Pagador <span className="text-md text-red-500">*</span>
              </Label>
              <Input
                placeholder="Ej: 04126004755"
                className="rounded-lg border-purple-800"
                name="telefonoPagador"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label>
                Referencia <span className="text-md text-red-500">*</span>
              </Label>
              <Input
                placeholder="Ej: 000043441234"
                className="rounded-lg border-purple-800"
                name="referencia"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label>
                Saldo <span className="text-md text-red-500">*</span>
              </Label>
              <Input
                placeholder="Ej: 000043441234"
                className="rounded-lg border-purple-800"
                name="importe"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label>
                Fecha <span className="text-md text-red-500">*</span>
              </Label>
              <Input
                type="date"
                placeholder="Ej: 000043441234"
                className="rounded-lg border-purple-800"
                name="fechaPago"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label>
                Banco Origen <span className="text-md text-red-500">*</span>
              </Label>
              <select
                name="bancoOrigen"
                id="bancoOrigen"
                className="rounded-lg border-purple-800 w-full border p-2 "
                onChange={handleChange}
              >
                <option value="">Seleccionar un banco de origen</option>
                {bankCode?.map((bank) => (
                  <option key={bank?.id} value={bank?.code}>
                    {bank?.bank}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#5d60ef] p-2 rounded-xl text-white"
            >
              Verificar Pago
            </button>
          </form>
        </div>
        <div className="flex flex-col h-full w-full flex-1 items-center justify-center">
          {loading ? (
            <div className="w-full h-full  items-center justify-center loader "></div>
          ) : (
            <>
              <div className="flex-1 flex items-center justify-center ">
                {response.code === 1000 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-44 h-44 text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
                {response.code === 1010 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-44 h-44 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center ">
                {response.message}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPayment;

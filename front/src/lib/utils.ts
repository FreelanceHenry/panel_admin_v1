import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const URL_HOST_DEV = "http://localhost:3000";
export const URL_HOST_PROD =
  "https://panel-admin-base-production.up.railway.app";

export enum actionStorage {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const localStorage = (
  id: string,
  action: actionStorage,
  Data?: Object
) => {
  if (actionStorage.GET === action) {
    const get = window.localStorage.getItem(id);
    if (get) {
      return JSON.parse(get);
    }
  } else if (actionStorage.POST === action) {
    window.localStorage.setItem(id, JSON.stringify(Data));
    const res = window.localStorage.getItem(id);
    return res;
  }
};


export const bankCode = [
  { id: 1, code: "0102", bank: "Banco de Venezuela, S.A.C.A." },
  { id: 2, code: "0104", bank: "Venezolano de Crédito" },
  { id: 3, code: "0105", bank: "Mercantil" },
  { id: 4, code: "0108", bank: "Provincial" },
  { id: 5, code: "0114", bank: "Bancaribe" },
  { id: 7, code: "0115", bank: "Exterior" },
  { id: 8, code: "0116", bank: "Occidental de Descuento" },
  { id: 9, code: "0128", bank: "Banco Caroní" },
  { id: 10, code: "0134", bank: "Banesco" },
  { id: 11, code: "0138", bank: "Banco Plaza" },
  { id: 12, code: "0151", bank: "BFC Banco Fondo Común" },
  { id: 13, code: "0156", bank: "100% Banco" },
  { id: 14, code: "0157", bank: "Del Sur" },
  { id: 15, code: "0163", bank: "Banco del Tesoro" },
  { id: 16, code: "0166", bank: "Banco Agrícola de Venezuela" },
  { id: 17, code: "0168", bank: "Bancrecer" },
  { id: 18, code: "0169", bank: "Mi Banco" },
  { id: 19, code: "0171", bank: "Banco Activo" },
  { id: 20, code: "0172", bank: "Bancamiga" },
  { id: 21, code: "0174", bank: "Banplus" },
  { id: 22, code: "0175", bank: "Bicentenario del Pueblo" },
  { id: 23, code: "0177", bank: "Banfanb" },
  { id: 24, code: "0191", bank: "BNC Nacional de Crédito" },
];
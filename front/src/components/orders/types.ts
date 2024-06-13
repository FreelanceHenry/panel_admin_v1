export interface BankApiRequest {
  cedulaPagador: string;
  telefonoPagador: string;
  telefonoDestino: string;
  referencia: string;
  fechaPago: string;
  importe: string;
  bancoOrigen: string;
}

export interface BankResponse {
  message: string;
  code: number;
}

export interface TableHeaderType {
  header: string;
}

export type ActionButtonModal = {
  componentAction: () => JSX.Element;
}

export type ToogleExpansive ={
  isExpansive: boolean;
  componentToogleView : (row: any) => JSX.Element
}

export interface DataTable {
  orders_id: number;
  payment_type_name: String;
  total: number;
  status: string;
}


export interface OptionsTable {
  Expansive?: ToogleExpansive;
  action?: ActionButtonModal[];
}

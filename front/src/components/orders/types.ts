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

export interface DataTable {
  id: number;
  typeAmount: String;
  total: number;
  status: string;
}

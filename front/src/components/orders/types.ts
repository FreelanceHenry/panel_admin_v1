export interface BankApiRequest {
    cedulaPagador: string,
    telefonoPagador: string,
    telefonoDestino: string,
    referencia: string,
    fechaPago: string,
    importe: string,
    bancoOrigen: string,
}

export interface BankResponse {
    message: string,
    code: number
}
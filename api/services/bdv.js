import axios from "axios";

class BdvBankService {
  constructor(uri, key) {
    this.uri = uri;
    this.key = key;
  }

  async getStatus({
    cedulaPagador,
    telefonoPagador,
    telefonoDestino,
    referencia,
    fechaPago,
    importe,
    bancoOrigen,
  }) {

    try {
      const response = await axios.post(
        this.uri,
        {
          cedulaPagador,
          telefonoPagador,
          telefonoDestino : "04241708810",
          referencia,
          fechaPago,
          importe: "1.00",
          bancoOrigen,
        },
        {
          headers: {
            "x-api-key": this.key,
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      const { code, message } = data;

      if (code === 1010) {
        return { code, message };
      }
      return { code, message };
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw error;
    }
  }
}

export default BdvBankService;

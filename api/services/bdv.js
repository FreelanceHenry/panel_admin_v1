import axios from "axios";
import quotesService from "../services/quotes.service.js";

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
      // Verify of existe reference
      const isExist = await quotesService.searchIsExistReference(
        referencia
      );

      if (isExist) {
        throw new Error("Referencia ya existe!");
      }

      const response = await axios.post(
        this.uri,
        {
          cedulaPagador,
          telefonoPagador,
          telefonoDestino,
          referencia,
          fechaPago: "2024-05-15",
          importe,
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
      throw new Error(error.message);
    }
  }
}

export default BdvBankService;

import { pool } from "../db/db.js";
import { calcularFechasCuotas } from "../libs/functions.js";

class QuotesService {
  constructor() {}

  async createQuotes(data) {
    try {
      const {
        total,
        quotes,
        pay_date_initial,
        reference_payment,
        origin_bank,
        payer_phone,
        payer_card_identity,
        status_global_name,
        orderId,
      } = data;

      const installment_total_amount = total / quotes;

      const dateFormatForMonth = calcularFechasCuotas(
        quotes,
        new Date(pay_date_initial)
      );

      let queryString = `INSERT INTO quotes  
      (order_id, installment_total_amount, number_quote, date_initial_payment, date_end_payment, status, reference_payment, origin_bank, payer_phone, payer_card_identity)  
      VALUES (
          ${orderId}, ${installment_total_amount}, 1 , '${dateFormatForMonth[0]}', '${dateFormatForMonth[1]}', '${status_global_name}', '${reference_payment}', 
          '${origin_bank}', '${payer_phone}', '${payer_card_identity}'
      )`;

      for (let i = 1; i < quotes; i++) {
        const date = dateFormatForMonth[i];

        queryString += `, (
          ${orderId}, ${installment_total_amount}, ${
          i + 1
        }, '${date}',NULL, NULL, NULL, NULL, NULL, NULL
      )`;
      }

      queryString += ";";

      await new Promise((resolve, reject) => {
        pool.query(queryString, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      return await this.searchLastQuote();
    } catch (error) {
      console.log(error.message);
      throw Error(error.message);
    }
  }

  async searchIsExistReference(reference) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM quotes
        WHERE reference_payment = '${reference}'`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (response.length === 0) return false;

    return true;
  }

  async searchLastQuote() {
    try {
      const response = await new Promise((resolve, reject) => {
        pool.query(
          `SELECT * FROM quotes
          WHERE quotes_id = LAST_INSERT_ID();`,
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      return response[0];
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getQuotesByOrderId(orderId) {
    try {
      if (!orderId) throw Error("La orden No existe");

      const response = await new Promise((resolve, reject) => {
        pool.query(
          ` SELECT * FROM quotes 
          WHERE quotes.order_id  = 62
          ORDER BY number_quote ASC `,
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      return response;
    } catch (error) {}
  }
}

const quotesService = new QuotesService();

export default quotesService;

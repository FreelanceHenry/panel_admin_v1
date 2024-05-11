import { pool } from "../db/db.js";

class PaymentTypeService {
  constructor() {}

  async getIdByName(payment_type_name) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT * 
        FROM 
            payment_type 
        WHERE 
            payment_type_name = '${payment_type_name}'
        `,
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
  }
}

const paymentTypeService = new PaymentTypeService();

export default paymentTypeService;

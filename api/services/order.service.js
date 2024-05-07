import { pool } from "../db/db.js";

class OrderService {
  constructor() {}

  getOrder() {
    try {
      const orders = new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM orders `, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
      return orders;
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw error;
    }
  }

  async createOrder() {
    try {
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw error;
    }
  }
}

const orderServices = new OrderService();

export default orderServices;

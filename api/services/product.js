const { pool } = require("../db/db.js");

class ProductService {
  constructor() {}

  getProducts() {
    const response = new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM products`, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return response;
  }
}

const productService = new ProductService();

module.exports = productService;

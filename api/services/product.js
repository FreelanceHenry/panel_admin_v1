import { pool } from "../db/db.js";
import imageService from "./image.service.js";

class ProductService {
  constructor() {}

  getProducts() {
    const response = new Promise((resolve, reject) => {
      pool.query(
        `SELECT * 
      FROM products
      WHERE date_create <= (SELECT MAX(date_create) FROM products);
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

  async getSingleProduct(id) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT *
        FROM products
        WHERE products.products_id = ${id}`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    const res = await imageService.getImageById(response[0].products_img1);
    return [{ ...response[0], image: res.file_name }]
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      const {
        products_name,
        products_total,
        products_description,
        stock,
        products_img1,
      } = product;
      const query = `
        INSERT INTO products (products_name, products_total, products_description, stock, products_img1)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [
        products_name,
        products_total,
        products_description,
        stock,
        products_img1,
      ];
      pool.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Después de insertar el producto, obtenemos todos los productos
          this.getProducts()
            .then((products) => {
              resolve(products);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }
}

const productService = new ProductService();

export default productService;

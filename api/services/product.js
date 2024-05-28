import { pool } from "../db/db.js";

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

  getSingleProduct(id) {
    const response = new Promise((resolve, reject) => {
      pool.query(
        `
      SELECT * ,
      color.colors_name,
      brand.brand_name,
      categories.categories_name
      FROM products
      INNER JOIN color ON color.colors_id = products.color_id
      INNER JOIN brand ON brand.brand_id = products.brand_id
      INNER JOIN categories ON categories.categories_id = products.categories_id
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
    return response;
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
          this.getProducts().then(products => {
            resolve(products);
          }).catch(err => {
            reject(err);
          });
        }
      });
    });
  }
}

const productService = new ProductService();

export default productService;

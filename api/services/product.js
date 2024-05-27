import { pool } from "../db/db.js";

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
    const response = new Promise((resolve, reject) => {
     const {name, price, description, stock, image } = product;
     const query = `
     INSERT INTO products (products_name, products_total, products_description, stock, products_img1, products_img2, products_img3, products_img4)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     `;
     const values = [name, price, description, stock, image];
     pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({id:results.insertId, ...product});
      }
     })
    })
    return response;
  }
}

const productService = new ProductService();

export default productService;

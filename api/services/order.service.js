import { pool } from "../db/db.js";
import paymentTypeService from "./paymentType.service.js";
import quotesService from "./quotes.service.js";
import statusGlobalService from "./statusGlobal.service.js";
import userService from "./users.js";

class OrderService {
  constructor() {}

  getOrder() {
    try {
      const orders = new Promise((resolve, reject) => {
        pool.query(
          `SELECT 
          orders.orders_id as _id ,
          orders.total,
          users.email,
          users.address,
          users.rif,
          users.username,
          users.dni,
          pt.payment_type_name,
           GROUP_CONCAT(DISTINCT  p.products_id) AS products_array,
           GROUP_CONCAT( DISTINCT quotes.quotes_id) AS quotes_array
        FROM 
          orders_product_user  
        INNER JOIN orders 
          ON orders.orders_id  = orders_product_user.order_id 
        INNER JOIN quotes   
          ON quotes.order_id  = orders_product_user.order_id  
        INNER JOIN users 
          ON users.user_id = orders_product_user.user_id
        INNER JOIN payment_type pt  
          ON pt.payment_type_id  = orders.payment_type_id 
        INNER JOIN products p  
          ON p.products_id  = orders_product_user.products_id  
        GROUP BY orders.orders_id
        ORDER BY orders.orders_id; `,
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
      return orders;
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw error;
    }
  }

  async createOrder(data) {
    try {
      //* Verify that the order  data  its not empty
      if (
        data.total &&
        data.reference_payment &&
        data.origin_bank &&
        data.payer_phone &&
        data.payer_card_identity &&
        data.email &&
        data.rif &&
        data.username &&
        data.dni &&
        data.payment_type_name &&
        data.status_global_name &&
        data.quotes &&
        data.date_initial &&
        data.date_end &&
        data.products.length === 0
      )
        throw Error("Los datos son obligatorios");

      // * Verify Reference duplicate
      const isExist = await quotesService.searchIsExistReference(
        data.reference_payment
      );

      if (isExist) {
        throw Error("Referencia ya existe!");
      }

      //* Converting data in the format correct
      const { payment_type_id } = await paymentTypeService.getIdByName(
        data.payment_type_name
      );
      const { status_global_id } = await statusGlobalService.getIdByName(
        data.status_global_name
      );

      const { user_id } = await userService.getIdByName(data.username);

      //*  create Order in to database
      await new Promise((resolve, reject) => {
        pool.query(
          ` INSERT INTO orders (payment_type_id, total, status_id)  VALUES ( ${payment_type_id}, ${data.total}, ${status_global_id} );
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

      const newOrder = await new Promise((resolve, reject) => {
        pool.query(
          `SELECT * FROM orders WHERE orders_id = LAST_INSERT_ID();`,
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });

      //*  create orders_product_user in to database
      await this.createRelationOrdersWhitProductAndUsers(
        user_id,
        newOrder[0].orders_id,
        data.products
      );

      //*  create quotes in to database
      await quotesService.createQuotes({ ...data, orderId: newOrder[0].orders_id,});

      return "The order was created successfully!";
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw Error(error.message);
    }
  }

  async createRelationOrdersWhitProductAndUsers(userId, orderId, data) {
    await new Promise((resolve, reject) => {
      pool.query(
        ` INSERT INTO orders_product_user  
        (
         order_id ,
         products_id,
         user_id,
         quantity,
         total 
        )  
      VALUES ${data.map(
        (quotes) =>
          `(${orderId}, ${quotes.product_id}, ${userId}, ${quotes.quantity}, ${quotes.total})`
      )}
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
  }
}

const orderServices = new OrderService();

export default orderServices;

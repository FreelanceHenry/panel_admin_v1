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
          orders.reference_payment,
          orders.origin_bank,
          orders.payer_phone,
          orders.payer_card_identity,
          users.email,
          users.address,
          users.rif,
          users.username,
          users.dni,
          pt.payment_type_name,
           GROUP_CONCAT(p.products_id) AS products_array
        FROM 
          orders_product_user  
        INNER JOIN orders 
          ON orders.orders_id  = orders_product_user.order_id 
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
        data.date_end
      )
        throw Error("Los datos son obligatorios");

      // * Verify Reference duplicate
      const isExist = quotesService.searchExistReference(data.reference_payment)

      if(isExist){
        throw Error('Referencia ya existe')
      }


      //* Converting data in the format correct
      const   { payment_type_id }  = await paymentTypeService.getIdByName(
        data.payment_type_name
      );
      const  { status_global_id }  = await statusGlobalService.getIdByName(
        data.status_global_name
      );

      const  { user_id }  = await userService.getIdByName(data.username);

      //*  create Order in to database
      await new Promise((resolve, reject) => {
        pool.query(
          ` INSERT INTO orders (payment_type_id, total, status_id)  VALUES ( ${payment_type_id}, ${data.total}, ${status_global_id} )`,
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
      await this.createRelationOrdersWhitProductAndUsers({
        userId,
        orderId: newOrder.id,
        productsId: data.productsId,
      });

    /*   //*  create quotes in to database
      await quotesService.createQuotes({ ...data, orderId: newOrder.id }); */
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw Error(error.message);
    }
  }


  async createRelationOrdersWhitProductAndUsers(userId, orderId, products) {

  }
}

const orderServices = new OrderService();

export default orderServices;

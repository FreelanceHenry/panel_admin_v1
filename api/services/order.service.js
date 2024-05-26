import { pool } from "../db/db.js";
import organizationService from "./organization.service.js";
import paymentTypeService from "./paymentType.service.js";
import quotesService from "./quotes.service.js";
import statusGlobalService from "./statusGlobal.service.js";
import userService from "./users.js";

class OrderService {
  constructor() {}

  async getOrder(userId) {
    const organizationId = await organizationService.getOrganizationById(
      userId
    );

    try {
      const orders = new Promise((resolve, reject) => {
        pool.query(
          `SELECT *
           FROM orders
           WHERE organization_id = '${organizationId}'
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
      return orders;
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw error;
    }
  }

  async createOrder(data) {
    const user = await userService.getById(data.user_id);

    try {
      //* Verify that the order  data  its not empty
      if (
        data.total &&
        data.reference_payment &&
        data.origin_bank &&
        data.payer_phone &&
        data.payer_card_identity &&
        user.email &&
        user.rif &&
        user.username &&
        user.dni &&
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
        user.user_id,
        newOrder[0].orders_id,
        data.products
      );

      //*  create quotes in to database
      await quotesService.createQuotes({
        ...data,
        orderId: newOrder[0].orders_id,
      });

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
         quantity
        )  
      VALUES ${data.map(
        (quotes) =>
          `(${orderId}, ${quotes.products_id}, ${userId}, ${quotes.quantity})`
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

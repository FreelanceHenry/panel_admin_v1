
import { pool } from "../db/db.js";

class OrganizationService {
  constructor() {}

  async getOrganizationById(userId) {

    const response = await new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT * 
        FROM orders_product_user 
        INNER JOIN users 
            on users.user_id = orders_product_user.user_id 
        INNER JOIN organization_users_user_type 
            on organization_users_user_type.user_id = users.user_id 
        WHERE users.user_id  = '${userId}'
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

const organizationService = new OrganizationService();

export default organizationService;

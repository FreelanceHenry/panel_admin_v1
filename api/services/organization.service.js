import { pool } from "../db/db.js";

class OrganizationService {
  constructor() {}

  async getOrganizationById(userId) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT organization_id  
        FROM  organization_users_user_type ouut 
        WHERE user_id = ${userId}
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
    return response[0];
  }
}

const organizationService = new OrganizationService();

export default organizationService;

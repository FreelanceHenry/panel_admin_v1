import  {pool}  from "../db/db.js";

class StatusGlobalService {
  constructor() {}

  async getIdByName(status_name) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT * 
        FROM 
            status_global 
        WHERE 
            status_global_name = '${status_name}'
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

const statusGlobalService = new StatusGlobalService();

export default  statusGlobalService;

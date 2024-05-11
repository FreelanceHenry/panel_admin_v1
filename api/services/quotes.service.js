import  {pool}  from "../db/db.js";

class QuotesService {
  constructor() {}

  async createQuotes() {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT users.username, user_type.user_type_name FROM users
          JOIN user_type ON user_type.user_type_id = users.user_type_id`,
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

const quotesService = new QuotesService();

export default  quotesService;

import  {pool}  from "../db/db.js";

class UserService {
  constructor() {}

  async getUsers() {
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
    return response;
  }
  async getIdByName(username) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users
          WHERE username = '${username}'`,
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

  async getById(userId) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users
          WHERE user_id = ${userId}`,
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

const userService = new UserService();

export default  userService;

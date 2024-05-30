import { pool } from "../db/db.js";

class ImageService {
  constructor() {}

  async postImage(fileName, path,type) {
     await new Promise((resolve, reject) => {
      pool.query(
        ` INSERT INTO  image (file_name, path_image, type) VALUES ('${fileName}', '${path}', '${type}')`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    const getLastImage = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * 
        FROM image 
        ORDER BY image_id DESC 
        LIMIT 1;
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
    return getLastImage[0];
  }

  async getImageById(id) {
    const response = await new Promise((resolve, reject) => {
      pool.query(
        ` SELECT *
        FROM image 
        WHERE  image_id = ${id}`,
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

const imageService = new ImageService();

export default imageService;

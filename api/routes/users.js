const express = require("express");
const { pool } = require("../db/db.js");
const router = express.Router(); // Creas el enrutador express correctamente

router.get("/", async (req, res) => {
  try {
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

    res.json(response).status(200);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

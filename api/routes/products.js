const express = require("express");
const { pool } = require("../db/db.js");
const router = express.Router(); // Creas el enrutador express correctamente

router.get("/", async (req, res) => {
  try {
    const response = await new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM products`, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    res.json(response).status(200);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

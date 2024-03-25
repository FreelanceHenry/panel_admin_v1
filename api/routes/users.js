const express = require("express");
const { pool } = require("../db/db.js");
const userService = require("../services/users.js");
const router = express.Router(); // Creas el enrutador express correctamente

router.get("/", async (req, res) => {
  try {
    res.json(await userService.getUsers())
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

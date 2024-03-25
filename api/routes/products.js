const express = require("express");
const productService = require("../services/product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await productService.getProducts());
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

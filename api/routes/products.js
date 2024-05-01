import express from "express";
import productService from "../services/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await productService.getProducts());
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

//ACCESS ALL USERS
//POST Return SingleProduct
router.post("/", async (req, res) => {
  const id = req.body.singleProductId;
  try {
    res.json(await productService.getSingleProduct(id));
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

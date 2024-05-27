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

router.post("/add", async (req, res) => {
  const {products_name, products_total, products_description, stock, products_img1, products_img2, products_img3, products_img4} = req.body;
  try {
    const newProduct = {
      products_name,
      products_total,
      products_description,
      stock,
      products_img1,
      products_img2,
      products_img3,
      products_img4,
    };
    const createdProduct = await productService.addProduct(newProduct);
    res.status(201).json(createdProduct)
  } catch (error) {
    console.error("Error adding product:", error)
    res.status(500).send("Internal Server Error");
  }
})

export default router;

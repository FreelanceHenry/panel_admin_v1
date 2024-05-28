import express from "express";
import productService from "../services/product.js";
import multer from "multer";

const upload = multer();
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
  const { nombre, precio, descripcion, Inventario, Image } = req.body;
  try {
    const newProduct = {
      products_name: nombre,
      products_total: precio,
      products_description: descripcion,
      stock: Inventario,
      products_img1: Image,
    };
    const createdProduct = await productService.addProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

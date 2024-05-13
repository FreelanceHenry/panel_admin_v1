import express from "express";
import orderServices from "../services/order.service.js";
import authMiddleware from "../middleware/verifyToken.js";

const router = express.Router();

// Access Users Client the organization
// GET  /api/v1/Order
router.get("/", authMiddleware, async (req, res) => {
  try {
    const response = await orderServices.getOrder();
    res.json(response);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Access Users Client the organization
// POST create /api/v1/order
router.post("/", async (req, res) => {
  const data = req.body;

  try {
    const response = await orderServices.createOrder(data);
    res.json(response).status(200);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

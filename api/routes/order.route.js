import express from "express";
import orderServices from "../services/order.service.js";
import authMiddleware from "../middleware/verifyToken.js";

const router = express.Router();

// Access Users Client the organization
// GET  /api/v1/Order
router.get("/", authMiddleware, async (req, res) => {
  try {
    const response = await orderServices.getOrder(req.user.id);
    res.json(response);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Access Users Client the organization
// POST create /api/v1/order
router.post("/", authMiddleware, async (req, res) => {
  const { data } = req.body;

  try {
    const response = await orderServices.createOrder({
      total: data.totalVEF,
      quotes: data.quotes,
      reference_payment: data.referencia,
      origin_bank: data.bancoOrigen,
      payer_phone: data.telefonoPagador,
      payer_card_identity: data.cedulaPagador,
      payment_type_name: "credit",
      pay_date_initial: data.fechaPago,
      status_global_name: "APROBADO",
      products: data.cart,
      user_id: req.user.id
    },  );
    res.json(response).status(200);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

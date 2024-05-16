import express from "express";
import BdvBankService from "../services/bdv.js";

const router = express.Router();

router.post("/mobile", async (req, res) => {
  const data = req.body;

  const bank = new BdvBankService(
    process.env.URI_BANK_PAYMENT_PROD,
    process.env.API_KEY_BANK
  );

  try {
    const response = await bank.getStatus(data);
    res.json(response); 
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json(error.message);
  }
});

export default router;

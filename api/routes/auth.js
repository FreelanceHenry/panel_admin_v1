const express = require("express");
const authService = require("../services/auth.js");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    res.json(await authService.login(username, password));
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email, dni, rif } = req.body;

  if (!username || !password || !email || !dni || !rif) {
    return res
      .status(402)
      .send({ Message: "Todos los campos son Obligatorios" });
  }

  try {
    res.json(await authService.register(username, password, email, dni, rif));
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

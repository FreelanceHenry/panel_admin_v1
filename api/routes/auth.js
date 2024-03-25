const express = require("express");
const { pool } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(402)
      .send({ Message: "Todos los campos son Obligatorios" });
  }

  try {
    const userData = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE username = '${username}';`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (userData.length === 0) {
      return res.status(500).send({ Message: "No existe el usuario" });
    }

    const comparePass = await bcrypt.compareSync(
      password,
      userData[0].password
    );
    if (!comparePass) {
      return res.status(500).send({ Message: "Contraseña Incorrecta" });
    }

    const token = jwt.sign({ id: userData[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const { password: userPassword, ...userWithoutPassword } = userData[0];

    res.json({ token, userWithoutPassword }).status(200);
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
    const salt = bcrypt.genSaltSync(10);
    const encodePassword = await bcrypt.hash(password, salt);

    await new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users ( username , password , email , dni , rif ) VALUES ('${username}','${encodePassword}','${email}','${dni}','${rif}')
        `,
        (error, results) => {
          if (error) {
            if (error.code === "ER_DUP_ENTRY") {
              return res
                .status(402)
                .send({ Message: "Username ya se cuentra registrado" });
            }
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    const lastIndex = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE users.username  = '${username}';`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    res.json(lastIndex).status(200);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

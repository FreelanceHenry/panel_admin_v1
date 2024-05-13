import  {pool}  from "../db/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class AuthService {
  constructor() {}

  async login(username, password) {
    if (!username || !password) {
      return res
        .status(402)
        .send({ Message: "Todos los campos son Obligatorios" });
    }

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

    const token = jwt.sign({ id: userData[0].user_id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token };
  }

  async register( username, password, email, dni, rif) {
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
    return lastIndex;
  }
}

const authService = new AuthService();

export default authService;

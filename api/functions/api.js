import express from 'express'
import serverless from "serverless-http";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import userRouter from '../routes/users.js'
import productsRouter from '../routes/products.js'
import authRouter from '../routes/auth.js'

dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


// NOTE: initial Server
app.use("/.netlify/functions/api/v1/users", userRouter);
app.use("/.netlify/functions/api/v1/products", productsRouter);
app.use("/.netlify/functions/api/v1/Auth", authRouter);

app.listen(port, () => {
  console.log(`SERVIDOR ARRIBA EN PUERTO ${port}`);
});

export const handler = serverless(app);

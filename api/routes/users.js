import express from 'express'
import userService from '../services/users.js';

const router = express.Router(); 

router.get("/", async (req, res) => {
  try {
    res.json(await userService.getUsers())
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;

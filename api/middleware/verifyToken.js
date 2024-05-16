import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = headers.split(" ")[1];

  const id = jwt.decode(token);

  req.user = id;
  next();
};

export default authMiddleware;

import express from "express";
import multer from "multer";
import imageService from "../services/image.service.js";

const router = express.Router();

export const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  dest: "public/uploads",
  limits: { fileSize: 1000000 },
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const image = await imageService.getImageById(id);
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.send(image.file_name);
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json(error.message);
  }
});

router.post("/add", upload.single("archivo"), async (req, res) => {
  const { originalname, path: filePath, mimetype } = req.file;
  try {
    res.json(await imageService.postImage(originalname, filePath, mimetype));
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json(error.message);
  }
});

export default router;

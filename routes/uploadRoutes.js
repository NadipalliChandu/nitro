const express = require("express");
const multer = require("multer");
const { uploadCSV, getUsers } = require("../controllers/uploadController");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadCSV);
router.get("/users", getUsers);

module.exports = router;

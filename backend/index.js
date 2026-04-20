// server/server.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload config (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 📁 Upload route (IPFS ke liye)
const { uploadToIPFS } = require("./service/ipfsService.js");

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const hash = await uploadToIPFS(file);

    res.json({
      message: "Uploaded to IPFS",
      ipfsHash: hash,
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
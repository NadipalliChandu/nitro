const express = require("express");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use("/api", uploadRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

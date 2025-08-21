const express = require("express");
const connectDB = require("./config");
const fileRoutes = require("./routes/uploadRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/files", fileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

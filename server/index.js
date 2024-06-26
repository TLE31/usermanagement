const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send({ success: true, msg: "Ok" }));

// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/otp", require("./routes/otpRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

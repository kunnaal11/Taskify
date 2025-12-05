import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import profileRoutes from "./routes/profile.js";

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

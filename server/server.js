import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Certificate Generator API is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

app.use(notFound);
app.use(errorHandler);

const parsedPort = Number.parseInt(process.env.PORT, 10);
const PORT = Number.isNaN(parsedPort) ? 3000 : parsedPort;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
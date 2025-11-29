import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectionDataBase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 4000;
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Conexão com o banco de dados
connectionDataBase();

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"

// Routes
import authRoutes from "./routes/authRoutes.js"
import fluxoRoutes from "./routes/fluxoRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

// DataBase
import { connectionDataBase } from "./config/db.js"

// Middlewares
import authMiddleware from "./middlewares/authMiddleware.js"
import VerifyRole from "./middlewares/verifyRole.js"
import Logout from "./middlewares/logout.js"

const PORT = 4000
const app = express()
app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))
app.use(
   cors({
      origin: "https://back-room-lac.vercel.app",
      credentials: true,
   })
)

connectionDataBase()

// Rotas do auth
app.use("/auth", authRoutes)
app.use("/admin", authMiddleware, VerifyRole("admin"), adminRoutes)
app.use("/logado", authMiddleware, (req, res) => {
   return res.status(200).json({ ok: true, message: "User logado", apps: req.user.apps })
})
app.use("/logout", Logout)

// Rotas do Fluxo de caixa
app.use("/fluxo", authMiddleware, fluxoRoutes)

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta: ${PORT}`)
})

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

//
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//

const PORT = 4000
const app = express()

app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))
app.use(express.static("frontend/dist"))

// CORS
const allowedOrigins = ["http://localhost:5173", "https://app.backroom.website"]

const corsOptions = {
   origin: function (origin, callback) {
      if (!origin) {
         return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
         return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
   },
   credentials: true,
}

app.use(cors(corsOptions))

// Banco de dados

connectionDataBase()

app.use("/auth", authRoutes)
app.use("/admin", authMiddleware, VerifyRole("admin"), adminRoutes)
app.use("/logado", authMiddleware, (req, res) => {
   return res.status(200).json({ ok: true, message: "User logado", apps: req.user.apps })
})
app.use("/logout", Logout)
app.use("/fluxo", authMiddleware, fluxoRoutes)
app.get("(.*)", (req, res) => {
   res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"))
})

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta: ${PORT}`)
})

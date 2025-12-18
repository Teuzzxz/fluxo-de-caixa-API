import { Router } from "express"
import { addBancoController, lookBancoController } from "../controllers/bancoController.js"
const bancoRoutes = Router()

bancoRoutes.get("/look", lookBancoController)
bancoRoutes.post("/add", addBancoController)

export default bancoRoutes

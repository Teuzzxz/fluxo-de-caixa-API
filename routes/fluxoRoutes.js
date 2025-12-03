import { FluxoController, addFluxoController, editFLuxoController, delFluxoController } from "../controllers/fluxoController.js"
import { Router } from "express"
const fluxoRoutes = Router()

fluxoRoutes.post("/look", FluxoController)
fluxoRoutes.post("/add", addFluxoController)
fluxoRoutes.post("/edit", editFLuxoController)
fluxoRoutes.post("/del", delFluxoController)

export default fluxoRoutes

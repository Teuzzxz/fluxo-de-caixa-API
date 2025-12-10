import { Router } from "express"
import { AccesController, getUsersController } from "../controllers/adminController.js"
const adminRoutes = Router()

adminRoutes.get("/Acess", AccesController)
adminRoutes.get("/getUsers", getUsersController)

export default adminRoutes

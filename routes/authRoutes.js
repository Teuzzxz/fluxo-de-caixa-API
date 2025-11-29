import { Router } from "express";
import { registerController } from "../controllers/authController.js";
const authRoutes = Router();

authRoutes.post("/register", registerController);

export default authRoutes;

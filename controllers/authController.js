import { registerService, loginService } from "../services/authService.js"
import "dotenv/config"

import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const isProd = process.env.PRODUCTION === "true"

export async function registerController(req, res) {
   try {
      const { email, password } = req.body

      if (email === "" || password === "") {
         return res.status(400).json({ ok: false, menssager: "Faltam informações!" })
      }
      const result = await registerService(email, password, req)

      if (!result.ok) {
         return res.status(400).json({ ok: false, menssager: "User já existe!" })
      }

      if (result.ok) {
         return res.status(200).json({ ok: true, menssager: "✅ Conta criada com sucesso!" })
      }
   } catch (error) {
      return res.status(400).json({ ok: false, menssager: error.message })
   }
}

export async function loginController(req, res) {
   try {
      const { email, password } = req.body

      if (email === "" || password === "") {
         return res.status(400).json({ ok: false, menssager: "Faltam informações!" })
      }

      const result = await loginService(email, password, req)

      if (!result.ok) {
         return res.status(400).json({ ok: false, menssager: "User não existe ou senha incorreta" })
      }
      if (result.ok) {
         const token = jwt.sign(
            {
               id: result.id,
               email: result.email,
               role: result.role,
               apps: result.apps,
            },
            JWT_SECRET,
            { expiresIn: "7d" } // token expira em 7 dias
         )

         res.cookie("access_token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
         })

         return res.status(200).json({ ok: true, menssager: "Logado com sucesso!" })
      }
   } catch (error) {
      res.status(400).json({ ok: false, menssager: error.message })
   }
}

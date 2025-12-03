import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export default function authMiddleware(req, res, next) {
   const token = req.cookies.access_token

   if (!token) {
      console.log("Token nao fornecido")
      return res.status(400).json({ ok: false, message: "Token não fornecido" })
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET)

      req.user = decoded

      next()
   } catch (err) {
      return res.status(401).json({ ok: false, message: "Token inválido" })
   }
}

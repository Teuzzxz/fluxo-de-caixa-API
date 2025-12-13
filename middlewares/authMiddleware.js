import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export default function authMiddleware(req, res, next) {
   const token = req.cookies.access_token

   if (!token) {
      return res.status(200).json({ ok: false, menssager: "Token não fornecido" })
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET)

      req.user = decoded

      next()
   } catch (err) {
      console.log(err)
      return res.status(401).json({ ok: false, menssager: err })
   }
}

import "dotenv/config"

export default function Logout(req, res) {
   try {
      const isProd = process.env.PRODUCTION === "true"

      res.clearCookie("access_token", {
         httpOnly: true,
         secure: isProd, // ✅ Igual ao cookie original
         sameSite: isProd ? "none" : "lax",
         path: "/", // ✅ Adicionado
         domain: isProd ? ".backroom.website" : undefined, // ✅ Adicionado
      })

      return res.status(200).json({ ok: true, message: "Deslogado com sucesso" })
   } catch (error) {
      return res.status(400).json({ message: error })
   }
}

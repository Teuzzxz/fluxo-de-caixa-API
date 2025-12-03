import "dotenv/config"

export default function Logout(req, res) {
   try {
      const isProd = process.env.PRODUCTION === "true"

      res.clearCookie("access_token", {
         httpOnly: true,
         secure: isProd,
         sameSite: isProd ? "none" : "lax",
      })

      return res.status(200).json({ message: "Deslogado com sucesso" })
   } catch (error) {
      console.log("Erro no try/catch")
      return res.status(400).json({ message: "Erro no try/catch" })
   }
}

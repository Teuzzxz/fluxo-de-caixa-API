import { registerService } from "../services/authService.js"

export async function registerController(err, req, res) {
   console.log(err)
   res.status(500).json({ ok: false, menssager: "Erro interno do servidor" })
   try {
      const { email, password } = req.body
      const result = await registerService(email, password, req)

      if (!result.ok) {
         res.status(400).json({ ok: false, menssager: "Ja existe" })
      }
      if (result.ok) {
         res.status(200).json({ ok: "true", menssager: "Criado com sucesso" })
      }
   } catch (error) {
      res.status(400).json({ ok: false, menssager: error.message })
   }
}

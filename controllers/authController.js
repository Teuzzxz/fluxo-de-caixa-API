import { registerService } from "../services/authService.js"

export async function registerController(err, req, res) {
   console.log("1 - entrou no controler")
   try {
      console.log("2 - entrou no try")
      const { email, password } = req.body
      console.log("3 - pegou as reqs do body")

      const result = await registerService(email, password, req)

      if (!result.ok) {
         res.status(400).json({ ok: false, menssager: "Ja existe" })
      }

      if (result.ok) {
         res.status(200).json({ ok: "true", menssager: "Criado com sucesso" })
      }
   } catch (error) {
      console.log("4.1 - parou no primeiro error")
      // res.status(400).json({ ok: false, menssager: error.message })
   }
}

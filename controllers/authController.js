import { registerService } from "../services/authService.js"

export async function registerController(req, res) {
   try {
      const { email, password } = req.body
      const result = await registerService(email, password, req)

      if (!result.ok) {
         res.status(400).json({ error: result.menssager })
      }
      if (result.ok) {
         res.status(200).json({ ok: result.menssager })
      }
   } catch (error) {
      res.status(400).json({ error: error.message })
      console.log(error)
   }
}

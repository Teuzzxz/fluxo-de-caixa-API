import { getUsersService } from "../services/adminService.js"

export function AccesController(req, res) {
   res.status(200).json({ ok: true, menssager: "Acesso permitido!" })
}

export async function getUsersController(req, res) {
   const result = await getUsersService()
   if (result.ok) {
      res.status(200).json({ ok: true, menssager: result.menssager, users: result.users })
   }
}

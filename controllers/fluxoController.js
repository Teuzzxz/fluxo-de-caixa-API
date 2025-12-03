import { fluxoService, addFluxoService, editFluxoService, delFluxoService } from "../services/fluxoService.js"

export async function FluxoController(req, res) {
   if (!req.body) {
      return res.status(400), json({ ok: false, menssager: "Data não enviada" })
   }
   const data = req.body.date

   const result = await fluxoService(data, req)

   if (result.ok) {
      return res.status(200).json({ ok: true, result: result.result })
   }
   if (!result.ok) {
      return res.status(400).json({ ok: false })
   }
}
export async function addFluxoController(req, res) {
   const info = req.body

   const result = await addFluxoService(info, req)

   if (result.ok) {
      return res.status(200).json({ ok: true, menssager: "Criado com sucesso" })
   }

   if (!result.ok) {
      return { ok: true }
   }
}

export async function editFLuxoController(req, res) {
   const info = req.body

   const result = await editFluxoService(info, req)
   if (result.ok) {
      res.status(200).json({ ok: true, menssager: "Editado com sucesso" })
   }

   if (!result.ok) {
      res.status(400).json({ ok: false, menssager: "Erro" })
   }
}

export async function delFluxoController(req, res) {
   try {
      const id = req.body._id

      const result = await delFluxoService(id)

      if (result.ok) {
         res.status(200).json({ ok: true, menssager: result.menssager })
      }

      if (!result.ok) {
         return res.status(400).json({ ok: false, menssager: result.menssager })
      }
   } catch (error) {
      return res.status(404).json({ ok: false, menssager: error })
   }
}

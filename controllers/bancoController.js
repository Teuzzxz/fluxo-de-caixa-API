import { addBancoService, lookBancoService } from "../services/bancoService.js"

export async function lookBancoController(req, res) {
   try {
      const resposta = await lookBancoService(req)
      if (!resposta.ok) {
         return res.status(400).json(resposta)
      }
      if (resposta.ok) {
         return res.status(200).json(resposta)
      }
   } catch (error) {
      console.error(error)
      return res.status(400)
   }
}

export async function addBancoController(req, res) {
   try {
      const resposta = await addBancoService(req)
      if (!resposta.ok) {
         return res.status(400).json(resposta)
      }
      if (resposta.ok) {
         return res.status(200).json(resposta.ok)
      }
   } catch (error) {
      console.error(error)
      return res.status(400)
   }
}

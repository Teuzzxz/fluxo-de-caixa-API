import Fluxo from "../mongodbSchemas/fluxo.js"

export async function fluxoService(data, req) {
   const id = req.user.id

   const ano = new Date(data).getFullYear()

   const mes = new Date(data).toLocaleString("pt-BR", { month: "long" })

   try {
      const result = await Fluxo.find({
         mes: mes,
         ano: ano,
         userID: id,
      })

      return { ok: true, result: result }
   } catch (error) {
      console.log(error)
      return { ok: true, erro: error }
   }
}

export async function addFluxoService(info, req) {
   const id = req.user.id
   const ano = String(new Date(info.data).getFullYear())
   const mes = new Date(info.data).toLocaleString("pt-BR", {
      month: "long",
   })
   info.ano = ano
   info.mes = mes
   info.userID = id
   if (info.tipo !== "Saída") {
      info.categoria = ""
      info.formadepagamento = ""
   }

   console.log(info)

   try {
      const newFluxo = await Fluxo.create(info)
      return { ok: true }
   } catch (error) {
      return { ok: false }
   }
}

export async function editFluxoService(info, req) {
   const ano = String(new Date(info.data).getFullYear())
   const mes = new Date(info.data).toLocaleString("pt-BR", {
      month: "long",
   })

   info.ano = ano
   info.mes = mes

   if (info.tipo === "Entrada") {
      info.categoria = ""
      info.formadepagamento = ""
   }
   try {
      const editfluxo = await Fluxo.updateOne({ _id: info._id }, { $set: { ...info } })
      return { ok: true }
   } catch (error) {}
   console.log(error)
   return { ok: false }
}

export async function delFluxoService(id) {
   try {
      const result = await Fluxo.deleteOne({ _id: id })
      if (result.deletedCount > 0) {
         return { ok: true, menssager: "Apagado com sucesso!" }
      }
      if (result.deletedCount < 1) {
         return { ok: false, menssager: "Esse fluxo não existe!" }
      }
   } catch (error) {
      return { ok: false, menssager: "ERRO!" }
   }
}

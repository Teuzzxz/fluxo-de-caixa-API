import banco from "../mongodbSchemas/banco.js"

export async function lookBancoService(req) {
   try {
      const resposta = await banco.find({ userID: req.user.id })
      console.log(resposta)

      return { ok: true, menssagem: "deu certo", resposta: resposta }
   } catch (error) {
      console.error(error)
      return { ok: false }
   }
}

export async function addBancoService(req) {
   try {
      if (req.body.nome === "" || req.body.aonde === "") {
         return { ok: false, menssagem: "Faltam informações" }
      }
      const id = req.user.id
      const info = req.body
      info.userID = id

      const resposta = await banco.create(info)
      if (resposta) {
         return { ok: true, menssagem: "deu certo" }
      }
   } catch (error) {
      console.error(error)
      return { ok: false }
   }
}

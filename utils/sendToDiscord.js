import fetch from "node-fetch"
const webhookUrl = "https://discord.com/api/webhooks/1448076849295917160/a3eT00u5AqRChITBe75_85-GDw8U3wBcfUUYc4URatSpKSeKJOXi6UZOM6JAXGg-HEHT"

export const sendToDiscord = async (email, ipCreated, city, state, country) => {
   console.log(city)

   try {
      const response = await fetch(webhookUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            embeds: [
               {
                  title: "Conta criada!",
                  description: `O email: ${email}  acaba de ser cadastrado`,
                  color: 3066993,
                  fields: [
                     { name: "IP", value: ipCreated },
                     { name: "city", value: city ? city : "indefinido" },
                     { name: "state", value: state ? state : "indefinido" },
                     { name: "country", value: country ? country : "indefinido" },
                  ],
               },
            ],
         }),
      })

      if (!response.ok) {
         return { ok: false, menssager: "Erro ao enviar mensagem para o Discord:" }
      } else {
         return { ok: true, menssager: "Mensagem enviada com sucesso:" }
      }
   } catch (err) {
      return { ok: false, menssager: err }
   }
}

import Users from "../mongodbSchemas/users.js"
import { hashPassword } from "../utils/passwordHASH.js"
// import { getLocation } from "../utils/geoLocation.js"

export const registerService = async (email, password, req) => {
   console.log("4 - Entrou no auth")

   const exist = await Users.findOne({ email })
   if (exist) {
      return {
         ok: false,
      }
   }

   console.log("5 - Pesquisou no banco de dados")

   const hash = await hashPassword(password)

   console.log("6 - Fez a senha")

   // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "187.44.10.20"

   // const location = await getLocation(ip)

   const newUser = await Users.create({
      email: email,
      password: hash,
      role: "user",
      // ipCreated: ip,
      // city: location.city,
      // state: location.state,
      // country: location.country,
   })

   console.log("7 - Cadastrou o user")

   return {
      ok: true,
   }
}

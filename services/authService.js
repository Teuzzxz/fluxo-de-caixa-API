import Users from "../mongodbSchemas/users.js"
import { hashPassword } from "../utils/passwordHASH.js"
import { getLocation } from "../utils/geoLocation.js"

export const registerService = async (email, password, req) => {
   const exist = await Users.findOne({ email })
   if (exist) {
      return {
         ok: false,
         menssager: "Já existe esse User",
      }
   }
   const hash = await hashPassword(password)

   const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "187.44.10.20"

   const location = await getLocation(ip)

   const newUser = await Users.create({
      email: email,
      password: hash,
      role: "user",
      ipCreated: ip,
      city: location.city,
      state: location.state,
      country: location.country,
   })

   return {
      ok: true,
      menssager: "Criado com sucesso",
   }
}

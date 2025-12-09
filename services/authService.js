import Users from "../mongodbSchemas/users.js"
import { compareHase } from "../utils/compareHase.js"
import { hashPassword } from "../utils/createHash.js"
import { getLocation } from "../utils/geoLocation.js"
import { getClientIp } from "../utils/getip.js"
import { sendToDiscord } from "../utils/sendToDiscord.js"

export const registerService = async (email, password, req) => {
   const exist = await Users.findOne({ email })
   if (exist) {
      return {
         ok: false,
      }
   }

   const hash = await hashPassword(password)

   const location = await getLocation(getClientIp(req))

   const city = await location.city
   const state = await location.state
   const country = await location.country
   const ipCreated = await getClientIp(req)

   const newUser = await Users.create({
      email: email,
      password: hash,
      role: "user",
      ipCreated: ipCreated,
      city: city,
      state: state,
      country: country,
   })
   console.log(city)

   const New = true

   sendToDiscord(email, ipCreated, city, state, country, New)

   console.log("aqui deu")
   return {
      ok: true,
      user: newUser,
   }
}

export const loginService = async (email, password) => {
   try {
      const user = await Users.findOne({ email })

      if (!user) {
         return {
            ok: false,
         }
      }

      const verificar = await compareHase(password, user.password)

      if (verificar) {
         const city = await location.city
         const state = await location.state
         const country = await location.country
         const ipCreated = await getClientIp(req)

         Users.findOneAndUpdate({ email }, { ip: ip, city: city, state: state, country: country })

         const New = false

         sendToDiscord(email, ipCreated, city, state, country, New)

         const id2 = user._id.toString()

         return {
            ok: true,
            email: user.email,
            id: id2,
            role: user.role,
         }
      }

      if (!result) {
         return {
            ok: false,
         }
      }
   } catch (error) {
      console.log(error)
      return { ok: false }
   }
}

import Users from "../mongodbSchemas/users.js"
import { hashPassword } from "../utils/passwordHASH.js"
import { getLocation } from "../utils/geoLocation.js"
import { getClientIp } from "../utils/getip.js"

export const registerService = async (email, password, req) => {
   const exist = await Users.findOne({ email })
   if (exist) {
      return {
         ok: false,
      }
   }

   const hash = await hashPassword(password)

   const location = await getLocation(getClientIp(req))

   const newUser = await Users.create({
      email: email,
      password: hash,
      role: "user",
      ipCreated: getClientIp(req),
      city: location.city,
      state: location.state,
      country: location.country,
   })

   console.log(newUser)

   return {
      ok: true,
   }
}

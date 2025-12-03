import argon2 from "argon2"

const PAPPER = process.env.PAPPER

export const compareHase = async (password, hash) => {
   try {
      const match = await argon2.verify(hash, password + PAPPER)
      if (match) {
         return true
      }
      if (!match) {
         return false
      }
   } catch (error) {
      console.log(hash)
      // console.log("--------------------------------------------------")
      // console.log(password)
      return false
   }
}

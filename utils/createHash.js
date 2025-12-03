import argon2 from "argon2"

const PAPPER = process.env.PAPPER

export const hashPassword = async (password) => {
   const hash = await argon2.hash(password + PAPPER, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
   })
   return hash
}

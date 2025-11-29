import mongoose from "mongoose"
import "dotenv/config"


export async function connectionDataBase () {
  try {
    await mongoose.connect(process.env.MONGODB_URI , {
      serverSelectionTimeoutMS: 50000, 
    })
    console.log("Conectado ao MongoDB!")
  } catch (error) {
    console.log("Erro ao conectar ao banco:")
    console.log(error)
  }
}
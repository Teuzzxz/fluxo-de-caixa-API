import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
   {
      tipo: String,
      valor: String,
      descrição: String,
      data: String,
      categoria: String,
      formadepagamento: String,
      observação: String,
      userID: String,
      ano: String,
      mes: String,
   },
   { collection: "fluxo" }
)

export default mongoose.model("Fluxo", UserSchema)

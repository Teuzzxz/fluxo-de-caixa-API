import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
   {
      userID: String,
      data: String,
      banco: String,
      criadoEm: String,
      atualizadoEm: String,
   },
   { collection: "banco" }
)

export default mongoose.model("Banco", UserSchema)

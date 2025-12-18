import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
   {
      userID: String,
      banco: String,
      data: String,
      valor: String,
      aonde: String,
   },
   { collection: "lançamentos" }
)

export default mongoose.model("Lançamentos", UserSchema)

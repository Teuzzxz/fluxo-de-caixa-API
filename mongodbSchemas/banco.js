import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
   {
      userID: String,
      data: {
         type: Date,
         default: Date.now,
      },
      nome: String,
      aonde: String,
      userID: String,
   },
   {
      collection: "banco",
      timestamps: true,
      versionKey: false,
   }
)

export default mongoose.model("Banco", UserSchema)

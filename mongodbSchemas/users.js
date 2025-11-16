import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
  },
  { collection: "users" }
)

export default mongoose.model("Users", UserSchema)

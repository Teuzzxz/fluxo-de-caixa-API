import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true, // obrigatório
         trim: true, // remove espaços no início/fim
         lowercase: true, // sempre salva em minúsculo
         // minlength: 6,
         maxlength: 80,
      },

      password: {
         type: String,
         required: true,
      },

      role: String,

      name: {
         type: String,
         trim: true, // remove espaços no início/fim
      },

      photo_perfil: {
         type: String,
      },

      ip: {
         type: String,
      },

      ipCreated: String,
      city: String,
      state: String,
      country: String,
   },
   {
      collection: "users",
      timestamps: true, // cria createdAt e updatedAt
      versionKey: false, // remove __v
   }
)

export default mongoose.model("Users", UserSchema)

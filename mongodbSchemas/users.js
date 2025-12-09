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
         default: null,
      },

      photo_perfil: {
         type: String,
         default: null,
      },

      ip: {
         type: String,
         default: null,
      },

      ipCreated: String,
      city: { type: String, default: null },
      state: { type: String, default: null },
      country: { type: String, default: null },
   },
   {
      collection: "users",
      timestamps: true, // cria createdAt e updatedAt
      versionKey: false, // remove __v
   }
)

export default mongoose.model("Users", UserSchema)

import Users from "../mongodbSchemas/users.js"

export async function getUsersService() {
   const users = await Users.find()
   if (users) {
      return { ok: true, menssager: "deu certo", users: users }
   }
}

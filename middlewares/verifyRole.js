export default function VerifyRole(roleRequired) {
   return (req, res, next) => {
      if (!req.user.role.includes(roleRequired)) {
         return res.status(403).json({ ok: false, message: "Acesso negado" })
      }
      return res.status(200).json({ ok: true, message: "Permissão concedida" })
   }
}

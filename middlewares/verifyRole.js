export default function VerifyRole(roleRequired) {
   return (req, res, next) => {
      if (req.user.role !== roleRequired) {
         return res.status(403).json({ ok: false, menssager: "Acesso negado" })
      } else {
         next()
      }
   }
}

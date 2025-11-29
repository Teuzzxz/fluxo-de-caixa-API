export function getClientIp(req) {
   const forwarded = req.headers["x-forwarded-for"]
   if (forwarded) {
      // Pega apenas o primeiro IP, removendo espaços
      return forwarded.split(",")[0].trim()
   }
   return req.socket.remoteAddress || "187.44.10.20"
}

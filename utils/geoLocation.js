export async function getLocation(ip) {
   try {
      const response = await fetch(`https://ipinfo.io/${ip}/json`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()

      // ipinfo retorna "region" como estado e "country" como código, city direto
      return {
         city: data.city || null,
         state: data.region || null,
         country: data.country || null,
      }
      console.log(ip)
   } catch (err) {
      console.error("Erro ao buscar localização:", err.message)
      console.log("ip:" + ip)

      return { city: "Desconhecida", state: "Desconhecido", country: "Desconhecido" }
   }
}

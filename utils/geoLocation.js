export async function getLocation(ip) {
   try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`)
      if (!response.ok) throw new Error("Falha ao obter IP")
      const data = await response.json()
      return {
         city: data.city,
         state: data.region,
         country: data.country_name,
      }
   } catch (err) {
      console.error(err)
      return { city: null, state: null, country: null }
   }
}

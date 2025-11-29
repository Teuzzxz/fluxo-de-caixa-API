const fetch = (await import("node-fetch")).default

export async function getLocation(ip) {
   const response = await fetch(`https://ipapi.co/${ip}/json/`)
   const data = await response.json()

   return {
      city: data.city,
      state: data.region,
      country: data.country_name,
   }
}

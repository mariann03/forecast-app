import Axios from 'axios'

const { REACT_APP_CITIES_API_KEY, REACT_APP_WEATHER_API_KEY } = process.env

export async function fetchLocation(locationId) {
  const ax = Axios.create({ baseURL: 'https://geocoder.ls.hereapi.com/6.2/' })
  const { data } = await ax.get('geocode.json', {
    params: {
      apikey: REACT_APP_CITIES_API_KEY,
      locationId,
      jsonattributes: 1
    }
  })

  return data.response.view?.[0]?.result?.[0]?.location?.displayPosition ?? {}
}

export async function fetchCities(query) {
  const ax = Axios.create({ baseURL: 'https://autocomplete.geocoder.ls.hereapi.com/6.2/' })
  const { data } = await ax.get('suggest.json', {
    params: {
      apikey: REACT_APP_CITIES_API_KEY,
      query,
      maxresults: 10,
      resultType: 'city'
    }
  })

  return data.suggestions.reduce((acc, suggestion) => {
    suggestion.name = `${suggestion.address.city}, ${suggestion.address.country}`
    if (acc.find(({ name }) => name === suggestion.name)) return acc
    acc.push(suggestion)
    return acc
  }, [])
}

export async function fetchWeather({ q, lat, lon }) {
  const ax = Axios.create({ baseURL: 'http://api.openweathermap.org/data/2.5/' })
  if (!lat || !lon) {
    const { data } = await ax.get('weather', { params: { q, appid: REACT_APP_WEATHER_API_KEY } })
    return data
  }

  const { data } = await ax.get('weather', { params: { lat, lon, appid: REACT_APP_WEATHER_API_KEY } })
  return data
}

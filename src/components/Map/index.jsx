import React from 'react'

const { REACT_APP_CITIES_API_KEY: apiKey } = process.env
export default function Map({ lat, lon, className }) {
  const baseUrl =
    'https://image.maps.ls.hereapi.com/mia/1.6/mapview?h=200&w=298&z=12&t=3&pip&' +
    `apikey=${apiKey}` +
    `&lat=${lat}` +
    `&lon=${lon}`

  return <img className={className} src={baseUrl} alt="map" />
}

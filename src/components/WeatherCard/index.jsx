import React from 'react'
import SkeletonCard from '../SkeletonCard'
import { getAllFromKelvin } from '../../utils/converters'
import './WeatherCard.css'

export default function WeatherCard({ forecast }) {
  if (!forecast) return <SkeletonCard />

  const [weather] = forecast.weather
  const tempByType = getAllFromKelvin(forecast.main.temp)
  const tempMinByType = getAllFromKelvin(forecast.main.temp_min)
  const tempMaxByType = getAllFromKelvin(forecast.main.temp_max)

  return (
    <div className="box common-background">
      <div className="columns is-mobile is-multiline">
        <div className="column">
          <figure className="image is-128x128 margin-auto">
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
          </figure>
        </div>
        <div className="column has-text-centered">
          <h2 className="title is-1 no-wrap has-text-info temp-margin-top">{tempByType.celcius}ºC</h2>
          <h3 className="subtitle is-4 has-text-grey-light">{tempByType.fahrenheit}ºF</h3>
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column has-text-centered">
          <p className="has-text-grey-light">Min: {tempMinByType.celcius} ºC</p>
          <p className="has-text-grey-light">Min: {tempMinByType.fahrenheit} ºF</p>
        </div>
        <div className="column has-text-centered">
          <p className="has-text-grey-light">Max: {tempMaxByType.celcius} ºC</p>
          <p className="has-text-grey-light">Max: {tempMaxByType.fahrenheit} ºF</p>
        </div>
      </div>
    </div>
  )
}

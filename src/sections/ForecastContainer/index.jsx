import React from 'react'
import WeatherCard from '../../components/WeatherCard'
import ForecastCard from '../../components/ForecastCard'

export default function ForecastContainer(props) {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <WeatherCard {...props} />
          </div>
          <div className="column">
            <ForecastCard {...props} />
          </div>
        </div>
      </div>
    </section>
  )
}

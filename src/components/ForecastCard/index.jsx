import React from 'react'
import SkeletonCard from '../SkeletonCard'
import Map from '../Map'
import './ForecastCard.css'

export default function ForecastCard({ forecast }) {
  if (!forecast) return <SkeletonCard />
  const [weather] = forecast.weather
  const { coord } = forecast

  return (
    <div className="box common-background">
      <div className="columns is-mobile is-multiline">
        <div className="column min-width min-width-column">
          <figure className="image is-rounded">
            <Map className="margin-auto" {...coord} />
          </figure>
        </div>
        <div className="column min-width-column">
          <table className="table centered-forecast-table no-background">
            <tbody>
              <tr>
                <th>Weather</th>
                <td>{weather.description}</td>
              </tr>
              <tr>
                <th>Pressure</th>
                <td>{forecast.main.pressure} hpa</td>
              </tr>
              <tr>
                <th>Humidity</th>
                <td>{forecast.main.humidity} %</td>
              </tr>
              <tr>
                <th>Geo coords</th>
                <td>
                  [{coord.lat}, {coord.lon}]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

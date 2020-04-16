import React, { useMemo, useEffect, useState, useContext } from 'react'
import { fetchWeather } from '../../utils/fetchers'
import NavBar from '../../sections/NavBar'
import ForecastContainer from '../../sections/ForecastContainer'
import History from '../../contexts/History'

export default function City({ history, location }) {
  const [forecast, setForecast] = useState(null)
  const localHistory = useContext(History.Context)
  const query = useMemo(() => {
    const search = new URLSearchParams(location.search)
    const q = search.get('q')
    const lat = search.get('lat')
    const lon = search.get('lon')
    return { q, lat, lon }
  }, [location])

  useEffect(() => {
    setForecast(null)
    fetchWeather(query)
      .then(setForecast)
      .catch(() => {
        history.push('/not-found')
      })
    // eslint-disable-next-line
  }, [query])

  useEffect(() => {
    if (!forecast) return
    localHistory.pushInHistory(location.search)
    // eslint-disable-next-line
  }, [forecast])

  return (
    <>
      <NavBar />
      <header className="section has-text-centered has-text-weight-bold">
        <h1 className="title is-1-size has-text-white">
          {forecast ? `${forecast.name}, ${forecast.sys.country}` : 'Loading...'}
        </h1>
      </header>
      <ForecastContainer forecast={forecast} />
    </>
  )
}

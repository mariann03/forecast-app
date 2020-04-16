import React from 'react'
import SearchBar from '../../components/SearchBar'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero is-fullheight hero-image">
      <div className="hero-body">
        <div className="container hero-padding">
          <h1 className="title is-size-1 has-text-white">Forecast App</h1>
          <SearchBar />
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import './Skeleton.css'

export default function WeatherCard() {
  return (
    <div className="box common-background">
      <div className="columns is-mobile is-multiline">
        <div className="column">
          <div className="box image-skeleton skeleton-background margin-auto" />
        </div>
        <div className="column max-width">
          <div className="box skeleton text-1 skeleton-background max-width" />
          <div className="box skeleton text-2 skeleton-background max-width" />
          <div className="box skeleton text-3 skeleton-background max-width" />
          <div className="box skeleton text-4 skeleton-background max-width" />
        </div>
      </div>
    </div>
  )
}

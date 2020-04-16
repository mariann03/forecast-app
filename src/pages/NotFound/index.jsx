// ?q=&lat=&lon=

import React from 'react'
import NavBar from '../../sections/NavBar'

export default function NotFound() {
  return (
    <>
      <NavBar />
      <section className="section">
        <div className="has-text-centered">
          <h1 className="title big-text has-text-danger">404</h1>
          <h2 className="subtitle is-size-1 has-text-danger">City Not Found</h2>
        </div>
      </section>
    </>
  )
}

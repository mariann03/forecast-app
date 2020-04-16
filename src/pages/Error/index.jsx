// ?q=&lat=&lon=

import React from 'react'
import NavBar from '../../sections/NavBar'

export default function Error() {
  return (
    <>
      <NavBar />
      <section className="section">
        <div className="has-text-centered">
          <h1 className="title big-text has-text-danger">500</h1>
          <h2 className="subtitle is-size-1 has-text-danger">Something went wrong</h2>
        </div>
      </section>
    </>
  )
}

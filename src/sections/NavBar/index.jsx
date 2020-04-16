// ?q=&lat=&lon=

import React from 'react'
import { Link } from 'react-router-dom'
import InputSearch from '../../components/SearchBar'
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar no-background nav-padding" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/">
          <h1 className="title is-3 has-text-white">Forecast App</h1>
        </Link>
      </div>
      <div className="navbar-end">
        <InputSearch />
      </div>
    </nav>
  )
}

export default NavBar

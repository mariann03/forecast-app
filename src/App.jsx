import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import City from './pages/City'
import NotFound from './pages/NotFound'
import Error from './pages/Error'
import History from './contexts/History'

function App() {
  useEffect(function setThemeByTime() {
    const [body] = document.getElementsByTagName('body')
    const hours = new Date().getHours()
    if (hours < 8 || hours > 18) {
      body.className = 'night'
      return
    }
    body.className = 'day'
  }, [])

  return (
    <History.Provider>
      <Router>
        <Switch>
          <Route path="/city" component={City} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/error" component={Error} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </History.Provider>
  )
}

export default App

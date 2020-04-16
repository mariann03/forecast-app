import React, { useState } from 'react'

const Context = React.createContext()

function Provider(props) {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || [])

  function updateHistory(newHistory) {
    setHistory(newHistory)
    const string = JSON.stringify(newHistory)
    localStorage.setItem('history', string)
  }

  function pushInHistory(item) {
    const parsedItem = decodeURI(item)
    const newHistory = [...new Set([parsedItem, ...history])]
    if (newHistory.length > 5) newHistory.pop()
    updateHistory(newHistory)
  }

  function removeFromHistory(item) {
    const newHistory = history.filter(oldItem => oldItem !== item)
    updateHistory(newHistory)
  }

  return <Context.Provider {...props} value={{ items: history, pushInHistory, removeFromHistory }} />
}

export default { Provider, Context }

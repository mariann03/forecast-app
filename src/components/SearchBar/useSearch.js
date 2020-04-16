import { useEffect, useState, useContext, useMemo } from 'react'

import { useHistory } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { fetchCities } from '../../utils/fetchers'
import History from '../../contexts/History'

function parsedHistoryItems(items) {
  return items.map(search => {
    const query = new URLSearchParams(search)
    const name = query.get('q')
    return { name, search, locationId: search }
  })
}

export default function useSearch() {
  const [query, setQuery] = useState('')
  const localHistory = useContext(History.Context)
  const historyItems = useMemo(() => parsedHistoryItems(localHistory.items), [localHistory.items])
  const [items, setItems] = useState(historyItems)
  const history = useHistory()

  const debouncedSearch = useDebounce(query, 500)
  function onChange(e) {
    setQuery(e.target.value)
  }

  async function search() {
    try {
      const cities = await fetchCities(debouncedSearch)
      setItems(cities)
    } catch (error) {
      console.error(error)
      history.push('error')
    }
  }

  useEffect(() => {
    if (!debouncedSearch) {
      setItems(historyItems)
      return
    }
    search()
    // eslint-disable-next-line
  }, [debouncedSearch, historyItems])

  return { inputProps: { value: query, onChange }, autocompleteItems: items }
}

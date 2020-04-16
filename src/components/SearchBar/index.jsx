import React, { useState, useMemo, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import useSearch from './useSearch'
import { fetchLocation } from '../../utils/fetchers'
import './Input.css'
import History from '../../contexts/History'

async function redirectToCityPage(history, { address, search, locationId }) {
  if (search) {
    history.push(`/city${search}`)
    return
  }
  try {
    const { latitude: lat, longitude: lon } = await fetchLocation(locationId)
    history.push(`/city?q=${address.city}&lat=${lat}&lon=${lon}`)
  } catch (error) {
    console.error(error)
  }
}

function Item({ name, search, address, locationId, onClick, isActive }) {
  const history = useHistory()
  const localHistory = useContext(History.Context)
  async function handleOnClick(e) {
    if (search) {
      onClick()
      return
    }
    e.preventDefault()
    onClick()
    redirectToCityPage(history, { address, locationId })
  }
  function handleOnRemove() {
    onClick()
    localHistory.removeFromHistory(search)
  }

  let itemClass = 'dropdown-item is-clipped has-ellipsis link-item'
  if (isActive) {
    itemClass += ' is-active'
  }

  return (
    <div className="control has-icons-right">
      <Link className={itemClass} to={`/city${search || `?q=${name}`}`} onClick={handleOnClick}>
        {name}
      </Link>
      {search && (
        <button
          onClick={handleOnRemove}
          type="button"
          className="icon is-right no-background no-border centered has-text-danger"
          alt="search"
        >
          <i className="fas fa-trash-alt" />
        </button>
      )}
    </div>
  )
}

export default function InputSearch() {
  const { inputProps, autocompleteItems } = useSearch('')
  const [index, setIndex] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setIndex(null)
  }, [autocompleteItems])

  const dropdownClass = useMemo(() => {
    const className = 'dropdown full-width'
    if (!isFocused || !autocompleteItems.length) return className
    return `${className} is-active`
  }, [isFocused, autocompleteItems])

  function onFocus() {
    setIsFocused(true)
  }
  function closeDropdown() {
    setIsFocused(false)
  }
  function onBlur(e) {
    const tagName = e.nativeEvent.relatedTarget?.tagName ?? ''
    if (tagName.match(/^(a|button)$/i)) return
    closeDropdown()
  }

  function onKeyDown(e) {
    const itemsCount = autocompleteItems.length
    switch (e.keyCode) {
      case 13:
        e.preventDefault()
        if (index == null) {
          history.push(`/city?q=${inputProps.value}`)
          closeDropdown()
          break
        }
        redirectToCityPage(history, autocompleteItems[index])
        closeDropdown()
        break
      case 38:
        e.preventDefault()
        if (!itemsCount) break
        setIndex((index - 1 + itemsCount) % itemsCount)
        break
      case 40:
        e.preventDefault()
        if (!itemsCount) break
        if (index == null) {
          setIndex(0)
          break
        }
        setIndex((index + 1) % itemsCount)
        break
      case 27:
        closeDropdown()
        break
      default:
    }
  }

  return (
    <div className="container">
      <div className="control has-icons-right">
        <input
          className="input is-expanded is-rounded common-background"
          type="text"
          placeholder="City Name"
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          {...inputProps}
        />
        <Link to={inputProps.value ? `/city?q=${inputProps.value}` : ''} className="icon is-right" alt="search">
          <i className="fas fa-search" />
        </Link>
      </div>
      <div className={dropdownClass}>
        <div className="dropdown-menu full-width dropdown-padding" role="menu">
          <div className="dropdown-content is-rounded">
            {autocompleteItems.map((city, i) => (
              <Item key={city.locationId} onClick={closeDropdown} isActive={index === i} {...city} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

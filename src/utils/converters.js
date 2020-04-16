export function kelvinToCelcius(temp) {
  return (temp - 273.15).toFixed(1)
}

export function celciusToFahrenheit(temp) {
  return (temp * 1.8 + 32).toFixed(1)
}

export function getAllFromKelvin(kelvin) {
  const celcius = kelvinToCelcius(kelvin)
  const fahrenheit = celciusToFahrenheit(celcius)

  return { kelvin, celcius, fahrenheit }
}

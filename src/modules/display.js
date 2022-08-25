import { getCoords, getWeather, getForecast } from './weather'

const displayLocation = async (coords) => {
    const location = document.getElementById('location')
    location.textContent = `Current weather in ${coords.name}`
    location.setAttribute('zip', coords.zip)
}

const displayWeather = async (coords, unit) => {
    const weather = await getWeather(coords.lat, coords.lon, unit)

    const icon = document.getElementById('weather')
    icon.innerHTML = ''
    const weatherIcon = new Image(300, 300)
    weatherIcon.src = weather.icon
    icon.appendChild(weatherIcon)
        
    const condition = document.getElementById('condition')
    condition.textContent = weather.condition

    const temp = document.getElementById('temp')
    temp.textContent = weather.temp

    const feel = document.getElementById('feel')
    feel.textContent = weather.feel

    const humidity = document.getElementById('humidity')
    humidity.textContent = weather.humidity

    const wind = document.getElementById('wind')
    wind.textContent = weather.wind
}

const displayForecast = async (coords, unit) => {
    const forecast = await getForecast(coords.lat, coords.lon, unit)
    const table = document.getElementById('forecast')
    table.innerHTML = ''

    forecast.forEach(entry => {
        const row = document.createElement('tr')
        table.appendChild(row)

        const day = document.createElement('th')
        day.scope = 'row'
        day.textContent = entry.weekday
        row.appendChild(day)

        const icon = new Image(90, 90)
        icon.src = entry.icon
        row.appendChild(icon)

        const pop = document.createElement('td')
        pop.textContent = entry.pop
        row.appendChild(pop)

        const temp = document.createElement('td')
        temp.textContent = entry.temp
        row.appendChild(temp)
    })
}

export { displayLocation, displayWeather, displayForecast }
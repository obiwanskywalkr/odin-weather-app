// OpenWeather API key: c52825b8eee6d7b7f39532505506474f
const lat = 33.834
const lon = -87.280


const getWeather = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c52825b8eee6d7b7f39532505506474f&units=imperial`, { mode: 'cors' })
    const data = await response.json()

    console.log(data)

    return data
}

const getForecast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c52825b8eee6d7b7f39532505506474f&units=imperial`, { mode: 'cors' })
    const data = await response.json()

    console.log(data)

    return data
}

const getCoords = async (zip) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=c52825b8eee6d7b7f39532505506474f`, { mode: 'cors' })
    const data = await response.json()

    const lat = data.lat
    const lon = data.lon

    return { lat, lon } 
}

getWeather(lat, lon)

getForecast(lat, lon)
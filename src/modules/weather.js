// OpenWeather API key: c52825b8eee6d7b7f39532505506474f
import {getDay, fromUnixTime } from "date-fns";

const getCoords = async (zip) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=c52825b8eee6d7b7f39532505506474f`, { mode: 'cors' })
        if (!response.ok) throw new Error(`Zip code (${zip}) can not be found`)
        const data = await response.json()
    
        const name = data.name
        const lat = data.lat
        const lon = data.lon
    
        return { name, lat, lon, zip }

    } catch (error) {
        alert(error)
        return null
    }
}

const getWeather = async (lat, lon, unit) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c52825b8eee6d7b7f39532505506474f&units=${unit}`, { mode: 'cors' })
        if (!response.ok) throw new Error(`Cannot retrieve weather for this location`)
        const data = await response.json()
    
        const condition = data.weather[0].main
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
        const temp = `${Math.round(data.main.temp)}°`
        const feel = `${Math.round(data.main.feels_like)}°`
        const humidity = `${data.main.humidity}%`
        const measure = (unit === 'imperial') ? 'mph' : 'km/h'
        const wind = `${Math.round(data.wind.speed)} ${measure}`
    
        return { condition, icon, temp, feel, humidity, wind }

    } catch (error) {
        alert(error)
        return null
    }
}

const forecastDay = (weekday, icon, pop, temp) => {
    const getDayName = (day) => {
        switch (day) {
            case 0: return 'Sunday'
            case 1: return 'Monday'
            case 2: return 'Tuesday'
            case 3: return 'Wednesday'
            case 4: return 'Thursday'
            case 5: return 'Friday'
            case 6: return 'Saturday'
        }
    }

    weekday = getDayName(getDay(fromUnixTime(weekday)))
    icon = `https://openweathermap.org/img/wn/${icon}@4x.png`
    pop =`${Math.round(pop * 100)}%`
    temp = `${Math.round(temp)}°`

    return { weekday, icon, pop, temp }
}

const getForecast = async (lat, lon, unit) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c52825b8eee6d7b7f39532505506474f&units=${unit}`, { mode: 'cors' })
        if (!response.ok) throw new Error(`Cannot retrieve forecast for this location`)
        const data = await response.json()
    
        const forecast = []
        const intervals = data.list
        intervals.forEach(entry => {
            const time = entry.dt_txt
            if (time.includes('12:00:00')) {
                const temp = forecastDay(entry.dt, entry.weather[0].icon, entry.pop, entry.main.temp)
                forecast.push(temp)
            }
        })
    
        return forecast

    } catch (error) {
        alert(error)
        return null
    }
}

export { getCoords, getWeather, getForecast }
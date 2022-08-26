import './style.css'
import GitHub from './img/github-icon.png'
import FastCat from './img/icon-cat.png'
import search from './img/search.png'
import { getCoords } from './modules/weather'
import { displayWeather, displayForecast, displayLocation } from './modules/display'

const loadImages = () => {
    const logo = document.getElementById('logo')
    const FastCatIcon = new Image(60, 60)
    FastCatIcon.src = FastCat
    logo.appendChild(FastCatIcon)
    
    const icon = document.getElementById('searchIcon')
    const searchIcon = new Image(35, 35)
    searchIcon.src = search
    icon.appendChild(searchIcon)
    
    const profile = document.getElementById('profile')
    const GitHubIcon = new Image(25, 25)
    GitHubIcon.src = GitHub
    profile.appendChild(GitHubIcon)
}

const displayLoading = () => {
    const loading = document.getElementById('overlay')
    loading.classList.add('display')

    setTimeout(() => {
        loading.classList.remove('display')
    }, 1000);
}

const initButtons = () => {
    const searchBar = document.getElementById('searchbar')
    const searchIcon = document.getElementById('searchIcon')
    const toggle = document.getElementById('unit')

    searchIcon.addEventListener('click', async () => {
        displayLoading()
        const parameters = searchBar.value
        const coords = await getCoords(parameters)
        const unit = (toggle.checked) ? 'metric' : 'imperial'
        displayLocation(coords, unit)
        displayWeather(coords, unit)
        displayForecast(coords, unit)
    })

    toggle.addEventListener('change', async () => {
        const unit = (toggle.checked) ? 'metric' : 'imperial'
        const parameters = document.getElementById('location').getAttribute('zip')
        const coords = await getCoords(parameters)
        displayLocation(coords, unit)
        displayWeather(coords, unit)
        displayForecast(coords, unit)
    })
}

window.onload = async () => {
    loadImages()
    initButtons()

    const coords = await getCoords('10001')
    const unit = 'imperial'
    displayLocation(coords)
    displayWeather(coords, unit)
    displayForecast(coords, unit)
}


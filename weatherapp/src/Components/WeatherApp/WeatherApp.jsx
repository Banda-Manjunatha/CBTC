import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const apiKey = "5e5c46ca9fc8c6d2553214c742a0ac4b";
    const [weatherData, setWeatherData] = useState({
        wicon: 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/clear_fbfxbm.png',
        temp: '',
        location: '',
        humidity: '',
        wind: ''
    });

    const search = async () => {
        const cityInput = document.querySelector('.cityInput');
        if (cityInput.value === '') {
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            setWeatherData({
                wicon: getWeatherIcon(data.weather[0].icon),
                temp: Math.floor(data.main.temp) + '°C',
                location: data.name,
                humidity: data.main.humidity + '%',
                wind: Math.floor(data.wind.speed * 3.6) + ' km/h'
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case '01d':
            case '01n':
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/clear_fbfxbm.png';
            case '02d':
            case '02n':
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/cloud_bdly7y.png';
            case '03d':
            case '03n':
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990846/drizzle_jrr9uz.png';
            case '04d':
            case '04n':
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990846/drizzle_jrr9uz.png';
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/rain_jnoekw.png';
            case '13d':
            case '13n':
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/snow_ftx7i9.png';
            default:
                return 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/clear_fbfxbm.png';
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='search' />
                <div className="searchIcon" onClick={search}>
                    <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/search_azzowy.png" alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherData.wicon} alt="" />
            </div>
            <div className="temp">
                {weatherData.temp}
            </div>
            <div className="weather-location">
                {weatherData.location}
            </div>
            <div className="data-container">
                <div className="element">
                    <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/humidity_fkxtkf.png " alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1711990845/wind_mpizln.png" alt="" className="icon" />
                    <div className="data">
                        <div className="wind">{weatherData.wind}</div>
                        <div className="text">Wind</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;

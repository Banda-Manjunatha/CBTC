import React, { useEffect, useState } from 'react';
import './weather.css';
import Description from '../Description/Description';
import { getApiData } from '../Weather_Services/Weather_Services.js';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState('metric');
    const [city, setCity] = useState('Bengaluru');
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            const data = await getApiData(city, units);
            setWeather(data);
        } catch (error) {
            setWeather(null)
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = () => {
        
        // You can add any further handling here, such as validation or submitting the form
        fetchWeatherData();
    };

    return (
        <div className='app'>
            <div className="overlay">
            <div className="container">
                <div className="section inputs">
                    <input type="text" name='city' placeholder='Enter city name' value={city} onChange={handleInputChange} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {loading ? ( // Render loading spinner while fetching data
                        <div className="loading-spinner"></div>
                    ) : weather && ( // Render weather data if available
                        <>
                            <div className="section temperature">
                                <div className="icon">
                                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                                    <img src={weather.iconUrl} alt="" />
                                    <h3>{weather.description}</h3>
                                </div>
                                <div className="temp">
                                    <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
                                </div>
                            </div>
                            <Description weather={weather} units={units} />
                        </>
                )}
                {!weather && (
                    <div className="error">
                        <h2>Please enter a valid city name</h2>
                    </div>
                )}
                </div> 
            </div>
        </div>
    )
}

export default Weather;

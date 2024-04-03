const API_Key = '5e5c46ca9fc8c6d2553214c742a0ac4b';

const makeIconUrl = (iconId) =>{ return `https://openweathermap.org/img/wn/${iconId}@2x.png` }

const getApiData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();
    
    const {
        weather, 
        main : {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind : {speed},
        sys : {country},
        name,
    } = data;

    const {description, icon} = weather[0];

    return{
        description, 
        iconUrl : makeIconUrl(icon),
        temp,
        feels_like,
        temp_max,
        temp_min,
        pressure,
        humidity,
        speed,
        country,
        name,
    }
}

export {getApiData};
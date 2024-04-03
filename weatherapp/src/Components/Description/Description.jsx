import React from 'react'
import './description.css'
import { FaArrowDown,FaArrowUp, FaWind } from 'react-icons/fa'
import {BiHappy} from 'react-icons/bi';
import { MdCompress, MdOutlineWaterDrop} from 'react-icons/md';

const Description = ({weather, units}) => {

    const tempUnit = units === 'metric' ? '°C' : '°F';

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown/>,
            title: 'min',
            data: Math.floor(weather.temp_min),
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp/>,
            title: 'max',
            data: Math.floor(weather.temp_max),
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <BiHappy/>,
            title: 'feels like',
            data: Math.floor(weather.feels_like),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <MdCompress/>,
            title: 'pressure',
            data: weather.pressure,
            unit: 'hPa',
        },
        {
            id: 5,
            icon: <MdOutlineWaterDrop/>,
            title: 'humidity',
            data: weather.humidity,
            unit: '%',
        },
        {
            id: 6,
            icon: <FaWind/>,
            title: 'wind speed',
            data: weather.speed,
            unit: 'km/h',
        }
    ]
  return (
    <div className='section description'>
        {cards.map((card) => (
         <div key={card.id} className="card">
            <div className="desc-card-icon">
                {card.icon}
                <small>{card.title}</small>
            </div>
            <h2>{`${card.data} ${card.unit}`}</h2>
        </div>
        ))}
    </div>
  )
}

export default Description
import React from 'react'
import { useState } from 'react'

export const ClimaApp = () => {

    const [ciudad, setCiudad] = useState('')

    const [clima, setClima] = useState(null)
    const urlBase = `https://api.openweathermap.org/data/2.5/weather`
    const api_key = `b2dbba5ab20b2646c2627479e6ae517a`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=3b5b2e5e9f2d5b8d1c9b8a6b8a6b8a6b`


    const fetchClima = async () => {
       
        try {
           
            const res = await fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
            const data = await res.json()

            // Conversión de Kelvin a Celsius
            const tempCelsius = data.main.temp - 273.15
            const tempMaxCelsius = data.main.temp_max - 273.15
            const tempMinCelsius = data.main.temp_min - 273.15
               
              // Actualiza los datos del clima con las temperaturas en Celsius
              setClima({
                ...data,
                main: {
                    ...data.main,
                    temp: tempCelsius,
                    temp_max: tempMaxCelsius,
                    temp_min: tempMinCelsius
                }
            })
            
        } catch (error) {
            console.error(error)
            
        }

    }



    const handleCambioCiudad =(e) => {

        setCiudad(e.target.value)

    }
    const handleSubmit = (e) => {

        e.preventDefault()

            if(ciudad.length > 0) fetchClima()

        
        
    }

  return (
    <div className='container'>
        <h1>Aplicacion del Clima </h1>
        <form onSubmit={handleSubmit }>
            <input type="text" placeholder='Ciudad'  value={ciudad} onChange= {handleCambioCiudad} />
            <button type="submit">Consultar</button>

        </form>
        {
            clima && (
                <div>

                    <h2>{clima.name}</h2>
                    <p>{clima.weather[0].description}</p>
                    <p>Temperatura: {clima.main.temp.toFixed(2)}°C</p>
                    <p>Temperatura Máxima: {clima.main.temp_max.toFixed(2)}°C</p>
                    <p>Temperatura Mínima: {clima.main.temp_min.toFixed(2)}°C</p>
                    <p>Humedad: {clima.main.humidity}%</p>
                    <p>Vientos: {clima.wind.speed}m/s</p>
                    <img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt="" />

                </div>
            )


        }
    </div>
  )
}

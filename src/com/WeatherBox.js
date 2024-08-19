import React from 'react'

const WeatherBox = ({weather}) => {
    let Flo
    const CtoF = () =>{
        Flo = (parseFloat(weather?.main.temp)*(9/5) + 32).toFixed(2)
    }
    console.log("dd",weather)
    CtoF()
    const windDeg = {
        rotate: `${parseInt(weather?.wind.deg)-90}deg`
    }
  return (  
    <div className='weather-box'>
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}°C / {Flo}°F</h2>
        <h3>{weather?.weather[0].description}</h3>
        <div>
        <img src='https://cdn-icons-png.flaticon.com/512/12469/12469135.png' alt='' className='windD' style={windDeg}/>
        속도: {weather?.wind.speed}</div>
    </div>
  )
}

export default WeatherBox
import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({Cities,setCity,getCurrentLocation,city}) => {

  const clickButton = (item) =>{
    if(typeof item == 'string'){
      setCity(item)
    }
    else{
      getCurrentLocation()
      setCity('')
    }
  }
 
  return (
    <div>
        <Button variant={city === ''?"outline-success":"success"} onClick={()=>clickButton(1)}>CurrentLocation</Button>{' '}
        {Cities.map((item)=>(
          <Button variant={city ===item?"outline-success":"success"} onClick={()=>clickButton(item)} className='button'>{item}</Button>
        ))}
    </div>
  )
}

export default WeatherButton
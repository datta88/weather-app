import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Img from './Image/weather.png';
import ImgSearch from './Image/search.png';


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [weatherDescription, setWeaatherDescription] = useState("")

  async function loadWeatherData() {
    let response = ""
    try {
      response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q= ${city} &appid=a98a72af7abee04e9ac0e54dc987e8b9`)
      setWeatherData(response.data);
    }

    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadWeatherData();
  }, [])

  useEffect(() => {

    setWeaatherDescription(` ${weatherData?.weather?.[0]?.main}
    (${weatherData?.weather?.[0]?.main})
    description} (${weatherData?.weather?.[0]?.description} ) `)

  }, [weatherData])

  useEffect(() => {
    loadWeatherData();
  }, [city])

  return (
    <>
    <h1 className='text-center'>Weather App </h1>
    <div className="App">
      <div className='flex'>
     <div>
     <input type='text' placeholder='Enter City Name ' value={city} onChange={(e) => {
        setCity(e.target.value);}} className='input-box' />
     </div>
       <div>
       <img src={ImgSearch} alt='React Logo' className='img-search' />
       </div>
      </div>
          <img src={Img} alt='React Logo' className='img' />
          

          <p><span className='temp'>{(weatherData?.main?.temp - 273).toFixed(2)}<sup>  º </sup>c</span>  </p>

      <p className='city-name'> {weatherData?.name} </p>
     
      {/* <p>Description : {weatherDescription} </p> */}
      <p className='visibility'>Visibility :{(weatherData?.visibility / 1000)}km/h</p>
      <p className='visibility'>wind speed</p>
    </div>
    </>
    
  );
}
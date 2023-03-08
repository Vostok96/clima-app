import axios from "axios";
import { useState, useEffect } from "react";  
  


const Weather = () => {
   
    const[location, setLocation] = useState({ lat:null, lon:null});
    const[isWeather, setIsWeather] = useState({});
    const[isC, setIsC] = useState( true )
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchCity, setSearchCity] = useState(""); 

    const rootClass = isDarkMode ? 'dark' : 'container';
    const icons = {
        "Thunderstorm" : "9.svg",
        "Drizzle" : "5.svg",
        "Rain" : "6.svg",
        "Snow" : "7.svg",
        "Mist" : "3.svg",
        "Smoke" : "3.svg",
        "Haze" : "2.svg",
        "Dust" : "8.svg",
        "Fog" : "2.svg",
        "Sand" : "8.svg",
        "Ash" : "8.svg",
        "Squall" : "8.svg",
        "Tornado" : "8.svg",
        "Clear" : "1.svg",
        "Clouds" : "4.svg",

    }

    useEffect(()=>{

        navigator.geolocation.getCurrentPosition(
           
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,                    
                });
            },

            (error) => {
                console.error(error)
            }
        );

    }, [])
    
    useEffect(()=>{
        if (location.lat && location.lon) {
            let url;
            if(searchCity !== ""){
                url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=b2e68bf6c7b96d175c5f870b6424b5f4&units=metric&lang=sp`;
            } else {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=b2e68bf6c7b96d175c5f870b6424b5f4&units=metric&lang=sp`;
            }
            axios
                .get(url)
                .then((resp)=>{
                    console.log(resp?.data)
                    setIsWeather(resp.data)
                })
                .catch(error => console.error(error))
        }

    }, [location.lat, location.lon, searchCity])

    
    const handleSearch = (e) => {
        setSearchCity(e.target.value);
    }

    return (
        <div className={`${rootClass}`}>
            <nav>
                <h1 className="titleApp">Weather app </h1>
                <span><i className='bx bx-search'></i><input type="text" placeholder="Busca una ciudad" onChange={handleSearch}  /></span> 
                <span className={`switch ${isDarkMode ? 'darkMode' : ''}`} onClick={() => setIsDarkMode(!isDarkMode)}></span>
                
                {/* <span><button className="activateDark" onClick={() => setIsDarkMode(!isDarkMode)}></button></span> */}
            </nav>    

            <div className="card"> 
                <h2 className="value">{isC ? `${isWeather.main?.temp.toFixed(0)}° ` : `${(isWeather.main?.temp*1.8 + 32).toFixed(0)}° `} <span><img src={`../../assets/iconos/${icons[isWeather.weather?.[0].main]}`} alt="" /> </span> 
                </h2>
                    <section className="viento">
                            VIENTO  
                            <ul className="vientoList">
                                <li>
                                    Velocidad: {isWeather.wind?.speed} m/s
                                </li>
                                <li>
                                    Grados: {isWeather.wind?.deg}
                                </li>
                            </ul>        
                    </section>    
                    <section className="nubes">
                            NUBES 
                            <ul className="nubesList">
                                <li>
                                    {isWeather.clouds?.all} % de nubosidad en la zona
                                </li>
                            </ul>                                                     
                    </section>                   
                    <section className="presion"> 
                            PRESIÓN 
                            <ul className="presionList">
                                <li>
                                    {isWeather.main?.pressure} hPa
                                </li>
                            </ul>                                      
                    </section>                                      
                    <h2 className="pais">
                        {isWeather.name}, {isWeather.sys?.country}
                    </h2>
                    <h3 className="estado">
                        {isWeather.weather?.[0].description}
                    </h3>
            </div>

            <button className="switch2" onClick={() => setIsC(!isC)}>{isC ? 'Cambiar a F°' : 'Cambiar a C°'}</button>
        </div>
    );
};

export default Weather;
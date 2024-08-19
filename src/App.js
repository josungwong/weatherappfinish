import "./App.css";
import { useEffect, useState, useCallback } from "react";
import WeatherBox from "./com/WeatherBox";
import WeatherButton from "./com/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  let [loading, setLoading] = useState(false);
  const [apierror, setApierror] = useState("");

  const Cities = ["Seoul", "New york", "Tokyo"];
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((Position) => {
      let lat = Position.coords.latitude;
      let lon = Position.coords.longitude;
      console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c4691d23de4baf3d370c324b9205aadb&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setApierror(error.message);
      setLoading(false);
    }
  };
  const getWeatherByCity = useCallback(
    async (lat, lon) => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=c4691d23de4baf3d370c324b9205aadb&units=metric&q=${city}`;
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setApierror(error.message);
        setLoading(false);
      }
    },
    [city]
  );

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);

  return (
    <div> 
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#ff0000"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            Cities={Cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
            city={city}
          />
        </div>
      )}
      <div>{apierror}</div>
    </div>
  );
}

export default App;

// 1. 현재 위치 기반위 위치
// 2. 도시명 섭씨 화씨 날씨상태
// 3. 5개의 버튼 (현재, 다른도시4개)
// 4. 버튼을 누를때마다 그에대한 날씨가 보임
// 5. 현재 버튼을 누르면 다시 내위치기반 위치
// 6. 로딩창

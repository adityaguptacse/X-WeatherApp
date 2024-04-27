import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

//SearchBar component
const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};


// WeatherCard component

const WeatherCard = ({title, data}) => {

  return(
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  )
}
//WeatherDisplay component

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeaterData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "b60c9247b8bc4dc493764805242704",
            q: city,
          },
        })
        .then((res) => {
          console.log(res.data);
          setWeaterData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data");
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}

      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard 
          title="Temperature" 
          data={`${weatherData.current.temp_c}°c`}          
          />
          <WeatherCard 
          title="Humidity" 
          data={`${weatherData.current.humidity}%`} 
          />
          <WeatherCard 
          title="Condition" 
          data={weatherData.current.condition.text}        
          />
            <WeatherCard 
          title="Wind Speed" 
          data={`${weatherData.current.wind_kph}kph`}          
          />
        </div>
      )}
    </div>
  );
};



//App component
function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };
  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;

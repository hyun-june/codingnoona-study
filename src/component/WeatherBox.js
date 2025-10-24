import ClipLoader from "react-spinners/ClipLoader";

const WeatherBox = ({ weather, loading }) => {
  return (
    <div className="weather-container">
      {loading ? (
        <div className="weather-box">
          <ClipLoader color="#f88c6b" size={150} />
        </div>
      ) : (
        <div className="weather-box">
          <div>{weather?.name}</div>
          <h2>
            {weather?.main.temp !== undefined
              ? `${weather.main.temp}℃`
              : "Loading..."}
          </h2>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <h3>{weather?.weather[0].description}</h3>
        </div>
      )}
    </div>
  );
};

export default WeatherBox;

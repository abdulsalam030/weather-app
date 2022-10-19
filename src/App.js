import "./App.css";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const api = {
  key: "a31366cab887cc8ef1dcd53fe372e965",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [name, setWeatherName] = useState("");
  const [temp, setTemp] = useState("");
  const [cond, setCond] = useState("");
  const [humidity, setHumidity] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const handleInput = () => {
  //   const res = fetch(
  //     `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setWeather(res);

  //       const Result = res;
  //       setResult(Result);
  //       setQuery("");
  //       console.log(result);
  //       console.log(weather);
  //       setWeatherName(Result.name);
  //       setTemp(Result.main.temp);
  //       setCond(Result.weather[0].main);
  //       setHumidity(Result.main.humidity);
  //       Result.main.temp >= 25 ? (
  //         <img src="/Images/sun.jfif" />
  //       ) : (
  //         <img src="/Images/cloud.jfif" />
  //       );
  //     });
  // };

  const Loaddata = () => {
    return fetch(
      `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
    ).then((res) => {
      setIsLoading(false);
      return res.json();
      // Hide loading screen
    });
  };

  const handleInput = async () => {
    setIsLoading(true);
    let results = await Loaddata();
    setResult(results);
  };

  useEffect(() => {
    console.log("djnwkjdnc", result);
  }, [result]);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="App">
      <h1>Weather Checker</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        {/* <div className="button"> */}
        <button className="button" onClick={handleInput} disabled={isLoading}>
          Search
        </button>
        {/* </div> */}
      </div>

      <div className="weather-part">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="date">Date: {dateBuilder(new Date())}</div>
            {/* <img src="./icons/cloud.svg" alt="Weather Icon" /> */}
            {result ? (
              result.main.temp < 20 ? (
                <img src="./icons/rain.svg" alt="Weather Icon" />
              ) : result.main.temp >= 20 && result.main.temp <= 30 ? (
                <img src="./icons/cloud.svg" alt="Weather Icon" />
              ) : (
                <img src="./icons/clear.svg" alt="Weather Icon" />
              )
            ) : (
              <></>
            )}
            <div className="temp">
              <span className="numb">
                {result ? result.main.temp : temp} °C
              </span>
            </div>
            {/* <div className="weather">{result ? result.weather[0].main : cond}</div> */}
            <div className="location">
              <i className="bx bx-map"></i>
              <span>{result ? result.name : name}</span>,
              {
                <div className="count">
                  {result ? result.sys.country : cond}
                </div>
              }
            </div>
            <div className="bottom-details">
              <div className="column feels">
                <i className="bx bxs-thermometer"></i>
                <div className="details">
                  <div className="temp">
                    <span className="numb-2">
                      {result ? result.main.temp : temp}°C
                    </span>   
                  </div>
                  <p>Feels like</p>
                </div>
              </div>
              <div className="column humidity">
                <i className="bx bxs-droplet-half"></i>
                <div className="details">
                  <span>{result ? result.main.humidity : humidity}%</span>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <div>
        <div className="content-box">
          <div className="image-box">
            {result ? (
              result.main.temp < 20 ? (
                <img src="/Images/rain.png" />
              ) : result.main.temp >= 20 && result.main.temp <= 30 ? (
                <img src="/Images/cloud.jfif" />
              ) : (
                <img src="/Images/sun.jfif" />
              )
            ) : (
              <></>
            )}
          </div>
          <div className="content">Place: {result ? result.name : name}</div>
          <div className="date">Date: {dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">
              Temperature: {result ? result.main.temp : temp}
              <sup>o</sup>C
            </div>
            <div className="weather">
              Condition: {result ? result.weather[0].main : cond}
            </div>
            <div className="humidity">
              Humidity: {result ? result.main.humidity : humidity}%
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;

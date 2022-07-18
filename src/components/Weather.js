import React from "react";
import { useState, useEffect } from "react";
import "../css/Weather.css";

const Weather = () => {
  const apiKey = "c804c2461e2d3849e26d07926609f755";
  const [datas, setData] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setLocation({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        });
      },
      () => {
        setLocation({ latitude: "err", longitude: "err" });
      }
    );
  };

  const getMainWeather = () => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const mainweather = [
          {
            icon: data.weather[0].icon.replace("n", "d"),
            temp: data.main.temp,
          },
        ];
        setMainData(mainweather);
      })
      .then(() => setLoading(false))
      .catch(() => {
        console.log("err");
      });
  };

  const getWeekWeather = () => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredList = data.list.filter((el, idx) => idx > 1 && idx < 7);
        const mappingList = filteredList.map((el) => ({
          icon: el.weather[0].icon.replace("n", "d"),
          temp: el.main.temp,
          time: el.dt_txt,
        }));
        setData(mappingList);
      })
      .then(() => setLoading(false))
      .catch(() => {
        console.log("err");
      });
  };

  useEffect(() => {
    getLocation();
    if (location.latitude !== null && location.latitude !== "err") {
      getMainWeather();
      getWeekWeather();
    }
  }, [location.latitude]);

  return (
    <>
      <div className="Weather-main">
        {mainData &&
          mainData.map((el, idx) => (
            <div key={idx} className="">
              <img
                src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                alt="날씨이"
              />
              <span>{el.temp}</span>
            </div>
          ))}
      </div>
      <div className="weather-sub">
        {datas &&
          datas.map((el, idx) => (
            <span key={idx} className="">
              <span>
                <img
                  src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                  alt="날씨"
                />
              </span>
              <span className="weather_right">
                <span>{el.time.slice(11, 13)}시</span>
                <span>{el.temp}</span>
              </span>
            </span>
          ))}
      </div>
    </>
  );
};

export default Weather;

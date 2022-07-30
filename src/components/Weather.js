import React from "react";
import { useState, useEffect } from "react";
import "../css/Weather.css";

const Weather = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [datas, setData] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [day, setDay] = useState([]);

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
        console.log(data);
        const mainweather = [
          {
            name: data.name,
            weather: data.weather[0].main,
            icon: data.weather[0].icon.replace("n", "d"),
            temp: data.main.temp,
            status: data.weather[0].main,
            maxtemp: data.main.temp_max,
            mintemp: data.main.temp_min,
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
        console.log(data);
        const filteredList = data.list.filter((el, idx) => idx > 1 && idx < 7);
        const mappingList = filteredList.map((el) => ({
          name: el.name,
          icon: el.weather[0].icon.replace("n", "d"),
          temp: el.main.temp,
          time: el.dt_txt,
          times: new Date(el.dt_txt).toLocaleDateString("ko-KR", {
            weekday: "long",
          }),
        }));

        let result = [data.list[0]];
        let times = data.list[0].dt_txt[9];
        for (let i = 0; i < data.list.length; i++) {
          if (times !== data.list[i].dt_txt[9]) {
            times = data.list[i].dt_txt[9];
            result.push(data.list[i]);
          }
        }
        const days = result.slice(0, 4);
        console.log(days);
        setDay(days);
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
    <div className="Weather">
      <section className="Weather-main">
        <img src={`/img/subweather.png`} alt="날씨이" />
        {mainData &&
          mainData.map((el, idx) => (
            <div key={idx} className="Weather-main__box">
              <span className="Weather-main__weather">
                {el.name} <br />
                <p>{Math.round(el.temp)}°</p>
                {el.status}
                <br />
                {`최고:${Math.round(el.maxtemp)}° 최저:${Math.round(
                  el.mintemp
                )}°`}
              </span>
            </div>
          ))}
        <span className="Weather-main__clause">오늘의 날씨 정보</span>
      </section>
      <div className="Weather-sub">
        <p>Hourly</p>
        {datas &&
          datas.map((el, idx) => (
            <span className="Weather-text" key={idx}>
              <span>{el.time.slice(11, 13)}시</span>
              <span>
                <img
                  src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                  alt="날씨"
                />
              </span>
              <span className="Weather-text__celc">{Math.round(el.temp)}°</span>
            </span>
          ))}
      </div>
      <div className="Weather-bottom">
        <p className="Weather-bottom__weekly">Weekly</p>
        {mainData &&
          mainData.map((el, idx) => (
            <div key={idx} className="Weather-bottom__box">
              <span className="Weather-bottom__weather">
                오늘 <br />
                <img
                  src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                  alt="날씨"
                />
                <br />
                <span>
                  <p>{`${Math.round(el.maxtemp)}°`}</p>
                  <p>{`${Math.round(el.mintemp)}°`}</p>
                </span>
              </span>
            </div>
          ))}
        <div className="Weather-bottom__week">
          {day &&
            day.map((el, idx) => (
              <span className="Weather-bottom__element" key={idx}>
                <span>
                  {new Date(el.dt_txt)
                    .toLocaleDateString("ko-KR", {
                      weekday: "long",
                    })
                    .slice(0, 1)}
                </span>
                <span className="weather-weather">
                  <img
                    src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                    alt="날씨"
                  />
                </span>
                <span>{`${Math.round(el.main.temp_min) + 4}°`}</span>
                <span>{`${Math.round(el.main.temp_min)}°`}</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;

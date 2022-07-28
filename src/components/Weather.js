import React from "react";
import { useState, useEffect } from "react";
import "../css/Weather.css";

const Weather = () => {
  const apiKey = "c804c2461e2d3849e26d07926609f755";
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
        const days = result.slice(0, 5);
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
    <>
      {/* {loading ? null : mainData.weather === "Clear" ? (
          <div className="Weather_backimg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmLy6c2ZmZg43nDGjj2oQNIseFaj1_TuiTyIpBgNe_BzZ3hW5UOEmRxU0WWcXKmyuwXU&usqp=CAU" />
          </div>
        ) : mainData.weather === "Mist" ? (
          <div className="Weather_backimg">
            <img src="https://www.10wallpaper.com/wallpaper/1366x768/1111/misty-Beautiful_natural_scenery_Desktop_Wallpapers_1366x768.jpg" />
          </div>
        ) : mainData.weather === "Rain" ? (
          <div className="Weather_backimg">
            <img src="https://c.wallhere.com/photos/83/ac/photography_water_monochrome_rain_glass_lights-77676.jpg!d" />
          </div>
        ) : (
          <div className="Weather_backimg">
            <img src="https://blog.kakaocdn.net/dn/bb8JPu/btqAy2n9ICw/ImlkUSOmY1yLdjrGuIKhgK/img.jpg" />
          </div>
        )} */}
      <section className="Weather-main">
        {mainData &&
          mainData.map((el, idx) => (
            <div key={idx} className="Weather-main__">
              {/* <img
                  src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                  alt="날씨이"
                /> */}
              <span className="Weather-main__weather">
                {el.name} <br />
                {Math.round(el.temp)}°C <br />
                {el.status}
                <br />
                {`최고: ${Math.round(el.maxtemp)}°C 최저: ${Math.round(
                  el.mintemp
                )}°C`}
              </span>
            </div>
          ))}
        <span className="Weather-main__clause">오늘의 날씨 정보</span>
      </section>
      <div className="Weather-sub">
        {datas &&
          datas.map((el, idx) => (
            <span key={idx} className="">
              <span className="Weather-sub__icon">
                <img
                  src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                  alt="날씨"
                />
              </span>
              <span className="Weather_text">
                <span>{el.times}</span>
                <span>{el.time.slice(11, 13)}시</span>
                <span>{Math.round(el.temp)}°C</span>
              </span>
            </span>
          ))}
      </div>
      <div>
        {day &&
          day.map((el, idx) => (
            <span key={idx}>
              {new Date(el.dt_txt).toLocaleDateString("ko-KR", {
                weekday: "long",
              })}
              <img
                src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                alt="날씨"
              />
              {Math.round(el.main.temp_min) + 2}
              {Math.round(el.main.temp_min)}
            </span>
          ))}
      </div>
    </>
  );
};

export default Weather;

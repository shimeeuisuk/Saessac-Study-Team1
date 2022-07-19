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
        console.log(data);
        const mainweather = [
          {
            weather: data.weather[0].main,
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
  console.log(mainData);
  return (
    <>
      <div>
        {loading ? null : mainData.weather === "Clear" ? (
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
        )}

        <div className="Weather-main">
          {mainData &&
            mainData.map((el, idx) => (
              <div key={idx} className="Weather-main__">
                <img
                  src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                  alt="날씨이"
                />
                <span>{el.temp}</span>
              </div>
            ))}
        </div>
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
                  <span>{el.time.slice(11, 13)}시</span>
                  <span>{el.temp}</span>
                </span>
              </span>
            ))}
        </div>
      </div>
    </>
  );
};

export default Weather;

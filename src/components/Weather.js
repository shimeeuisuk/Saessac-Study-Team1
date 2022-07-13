import React from "react";
import { useState, useEffect } from "react";

const Weather = () => {
  const apiKey = "c804c2461e2d3849e26d07926609f755";
  const [datas, setData] = useState(null);
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
        setLocation({ latitude: 35.1028, longitude: 129.0403 });
      }
    );
  };

  const getNoLocationData = () => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=1838524&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const newList = [
          {
            temp: data.main.temp,
            time: data.dt_txt,
          },
        ];
        setData(newList);
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
    if (location.latitude !== null && location.latitude !== "err")
      getWeekWeather();
    // if (location.latitude === "35.1028") getNoLocationData();
  }, [location.latitude]);
  console.log(datas);
  return (
    <>
      {datas &&
        datas.map((el, idx) => (
          <div key={idx}>
            <span>{el.temp}</span>
            <span>{el.time.slice(11, 13)}</span>
          </div>
        ))}
    </>
  );
};

export default Weather;

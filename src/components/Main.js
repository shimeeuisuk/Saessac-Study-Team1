import { Link } from "react-router-dom";
import "../css/Main.css";
const { useState, useEffect } = require("react");

function Main() {
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
        setLocation({ latitude: "err", longitude: "err" });
      }
    );
  };

  const getNoLocationData = () => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=1838524&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(() => {
        console.log("err");
      });
  };

  const getLocationData = () => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(() => {
        console.log("err");
      });
  };

  useEffect(() => {
    getLocation();
    if (location.latitude !== null && location.latitude !== "err")
      getLocationData();
    if (location.latitude === "err") getNoLocationData();
  }, [location.latitude]);

  if (loading) return null;

  console.log(datas.name, location.latitude, location.longitude);
  console.log(datas.main.temp);

  return (
    <div className="main-container">
      <div className="main-weather">
        <p>{datas.name}</p>
        <p>{datas.main.temp}</p>
        <p>{datas.weather[0].main}</p>
      </div>
      <div className="main-container__bottom">
        <button>
          <Link to="/postlist">러닝메이트 찾기</Link>
        </button>
        <button>
          <Link to="/postlist">러닝장소 추천</Link>
        </button>
      </div>
    </div>
  );
}

export default Main;

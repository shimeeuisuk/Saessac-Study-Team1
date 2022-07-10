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
      `https://api.openweathermap.org/data/2.5/weather?id=1838524&appid=${apiKey}&units=metric`
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
  const weekWeather = () => {
    setLoading(true);
    fetch(
      `api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
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
    weekWeather();
  }, [location.latitude]);

  useEffect(() => {
    getLocation();
    if (location.latitude !== null && location.latitude !== "err")
      getLocationData();
    if (location.latitude === "err") getNoLocationData();
  }, [location.latitude]);

  return (
    <>
      <div className="main-container">
        <div className="main-weather">
          {
            loading ? null : datas.weather[0].main === "Clear" ? (
              <div className="main-top__weather">
                <h1>오늘의 날씨는 맑음, 같이 뛸래?</h1>
                <img src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2019_23/2426541/180509-running-outdoors-al-1053.jpg"></img>
              </div>
            ) : datas.weather[0].main === "Mist" ? (
              <div className="main-top__weather">
                <h1>오늘은 안개가 많이 낀 날!</h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCcoo4zNBtmLD0ZTix8uD0wKxjTRqrpP0Zg&usqp=CAU"></img>
              </div>
            ) : datas.weather[0].main === "Rain" ? (
              <div className="main-top__weather">
                <h1>오늘은 비 오는 날 ! 실내에서 뛰어볼까요 ?</h1>
                <img src="https://t1.daumcdn.net/cfile/tistory/99FFC0335CAD70620C"></img>
              </div>
            ) : (
              <div className="main-top__weather">
                <h1>오늘의 날씨는 좋지 않아요 ㅠㅠ 다음에 만나요</h1>
                <img src="https://images.idgesg.net/images/article/2018/04/lightning_clouds_storm_thunder-100754499-large.jpg?auto=webp&quality=85,70"></img>
              </div>
            )
            // <p>{datas.name}</p>
            // <p>{datas.main.temp}</p>
            // <p>{datas.weather[0].main}</p>
          }
        </div>
        <div className="main-container__bottom">
          <div className="main-bottom__left">
            <div className="main-bottom__left__img">
              <Link to="/postlist">
                <p>러닝메이트 구하기</p>
                <img src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/YiG/image/ookjc5A76DBvYx1s08f9MpeINJk" />
              </Link>
            </div>
          </div>
          <div className="main-bottom__right">
            <div className="main-bottom__right__img">
              <Link to="/postlist">
                <p>러닝장소 추천</p>
                <img src="https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202106/30/joongang/20210630091042255rjdv.jpg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

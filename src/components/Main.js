const { useState, useEffect } = require("react");

function Main() {
  const apiKey = "c804c2461e2d3849e26d07926609f755";
  const [datas, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        setLatitude(data.coords.latitude);
        setLongitude(data.coords.longitude);
      },
      () => {
        console.log("err");
      }
    );
  };

  const getData = () => {
    setLoading(true);
    setTimeout(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch(() => {
          console.log("err");
        });
    }, 300);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (latitude !== null) getData();
  }, [latitude]);

  if (loading) return null;

  console.log(datas.name, latitude, longitude);
  console.log(datas.main.temp);

  return (
    <div className="main-container">
      <p>{datas.name}</p>
      <p>{datas.main.temp}</p>
      <p>{datas.weather[0].main}</p>
    </div>
  );
}

export default Main;

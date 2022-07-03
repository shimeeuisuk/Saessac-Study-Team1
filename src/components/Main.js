const { useState, useEffect } = require("react");

function Main() {
  const apiKey = "c804c2461e2d3849e26d07926609f755";
  const [datas, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((data)=> {
      setLocation({latitude: data.coords.latitude, longitude: data.coords.longitude})
    }, () => {
      setLocation({latitude: 'err', longitude: 'err'})
    })
  }

  const getNoLocationData = () => {
    setLoading(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=1838524&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => setData(data))
    .then(() => setLoading(false))
    .catch(() => {console.log('err')})
  }

  const getLocationData = () => {
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
    getLocation()
    if(location.latitude !== null && location.latitude !== 'err') getLocationData()
    if(location.latitude === 'err') getNoLocationData()
  }, [location.latitude])

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

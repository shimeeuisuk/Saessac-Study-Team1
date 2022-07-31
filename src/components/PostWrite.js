import { useEffect, useState } from "react";
import axios from "axios";

export default function PostWrite() {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("https://saessac.kro.kr:80/location/list");
      setLocation([...res.data]);
    })();
  }, []);
  return (
    <div>
      <select>
        <option key="000">지역 선택</option>
        {location.map((el, idx) => {
          return <option key={idx}>{el.locationName}</option>;
        })}
      </select>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

export default function PostWrite() {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/location/list");
      setLocation([...res.data]);
    })();
  }, []);
  return (
    <div>
      <select>
        {location.map((el, idx) => {
          return <option key={idx}>{el.locationName}</option>;
        })}
      </select>
    </div>
  );
}

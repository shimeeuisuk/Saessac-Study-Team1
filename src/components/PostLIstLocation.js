import { useState, useEffect } from "react";
import axios from "axios";
import PostBox from "./PostBox";

export default function PostListLocation({ page }) {
  const [locationlist, setLocationlist] = useState([]);
  const offset = (page - 1) * 6;
  //데이터 get 요청
  useEffect(() => {
    axios
      .get(
        `http://34.168.215.145/topic/list?sort=desc&type=location&offset=${offset}&limit=6`
      )
      .then((res) => {
        setLocationlist([...res.data]);
      });
  }, [offset]);

  return (
    <>
      {locationlist.map((el, i) => {
        return <PostBox data={el} key={i} />;
      })}
    </>
  );
}

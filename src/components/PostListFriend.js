import { useState, useEffect } from "react";
import axios from "axios";
import PostBox from "./PostBox";

export default function PostListFriend({ page }) {
  const [friendlist, setFriendlist] = useState([]);
  const offset = (page - 1) * 6;

  //데이터 get 요청
  useEffect(() => {
    axios
      .get(
        `https://saessac.kro.kr:80/topic/list?sort=desc&type=friend&offset=${offset}&limit=6`
      )
      .then((res) => {
        setFriendlist([...res.data]);
      });
  }, [offset]);

  return (
    <>
      {friendlist.map((el, i) => {
        return <PostBox data={el} key={i} />;
      })}
    </>
  );
}

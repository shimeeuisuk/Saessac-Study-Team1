import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function PostList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://34.168.215.145/topic/list").then((res) => {
      setList([...res.data]);
    }); //데이터를 가지고 옴
  }, []);
  return (
    <>
      <div>
        {list.map((el) => {
          return <PostBox data={el} />;
        })}
      </div>
    </>
  );
}

function PostBox(props) {
  console.log(props.data);
  let [like, setLike] = useState(0);
  // const date = new Date(props.data.created_at).toLocaleDateString();
  // const time = new Date(props.data.created_at).toLocaleTimeString();
  // const dateTime = `${date} ${time}`;

  return (
    <>
      <div className="communitypage-container">
        <div className="communitypage-container__top">
          <div className="communitypage-top__left">
            <h2>{props.data.topicTitle}</h2>
            <div>{new Date(props.data.created_at).toLocaleString()}</div>
          </div>
          <div className="communitypage-top__right">
            <span
              onClick={() => {
                setLike(like + 1);
              }}
            >
              {" "}
              👍{" "}
            </span>{" "}
            {like}
          </div>
        </div>
        <div className="communitypage-container__bottom">
          <div className="communitypage-bottom__content">
            <div className="communitypage-content__img">
              <img
                className="communitypage-content__thumb"
                src={`http://34.168.215.145/${props.data.userPicture}`}
              />
            </div>
            <div className="communitypage-content__preview">
              <span>{props.data.userID}</span>
              <span> </span>
              <span>{props.data.topicContents}</span>
            </div>
          </div>
          <div className="communitypage-bottom__detail">
            <Link to={`/postdetail/${props.data.tid}`}>
              <span>상세더보기</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

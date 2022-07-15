import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/PostList.css";

export default function PostList(props) {
  const [list, setList] = useState([]);
  const [friendlist, setFriendlist] = useState([]);
  const [locationlist, setLocationlist] = useState([]);

  useEffect(() => {
    axios.get("http://34.168.215.145/topic/list").then((res) => {
      setList([...res.data]);
    }); //데이터를 가지고 옴
  }, []);

  useEffect(() => {
    setFriendlist(
      list.filter((el) => {
        return el.type === "friend";
      })
    );
  }, [list]);

  useEffect(() => {
    setLocationlist(
      list.filter((el) => {
        return el.type === "location";
      })
    );
  }, [list]);

  return (
    <>
      {props.selectedTab === 0 ? (
        <div>
          {friendlist.map((el, i) => {
            return <PostBox data={el} key={i} />;
          })}
        </div>
      ) : (
        <div>
          {locationlist.map((el, i) => {
            return <PostBox data={el} key={i} />;
          })}
        </div>
      )}
    </>
  );
}

function PostBox(props) {
  return (
    <>
      <div className="communitypage-container">
        <div className="communitypage-container__top">
          <div className="communitypage-top__left">
            <h2>
              <Link
                to={`/postdetail/${props.data.tid}`}
                style={{ textDecoration: "none" }}
              >
                {props.data.topicTitle}
              </Link>
            </h2>
            <div>{new Date(props.data.created_at).toLocaleString()}</div>
          </div>
          <div className="communitypage-top__right">
            <span>
              {" "}
              {props.data.type === "location"
                ? null
                : props.data.recruit === "recruiting"
                ? "모집중"
                : "모집완료"}
            </span>
          </div>
        </div>
        <div className="communitypage-container__middle">
          <div>
            <div className="communitypage-middle__content">
              {props.data.topicContents}
            </div>
          </div>
          <div className="communitypage-container__bottom">
            <div className="communitypage-bottom__information">
              <span className="communitypage-bottom__img">
                <img
                  className="communitypage-bottom__thumb"
                  src={`http://34.168.215.145/${props.data.userPicture}`}
                />
              </span>
              <span>
                서울 {props.data.locationName} | {props.data.userID}
              </span>
            </div>
            <div className="communitypage-bottom__reply">
              <span>💬</span>0
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const [detail, setDetail] = useState({});
  let params = useParams();
  console.log(params);

  useEffect(() => {
    axios.get(`http://34.168.215.145/topic/${params.id}`).then((res) => {
      const data = res.data[0];
      setDetail({ ...data });
    });
  }, []);

  return (
    <>
      <PostContent detail={detail} />
      <PostReply />
    </>
  );
}

function PostContent(props) {
  let [like, setLike] = useState(0);
  console.log(props.detail);
  return (
    <>
      <section className="communitypage-container">
        <div className="communitypage-container__user">
          <div className="communitypage-user__img">
            <img className="user__img" src="img/qq.jpeg" />
          </div>
          <div className="communitypage-user__username">
            <span>{props.detail.userID}</span>
            <div>2022.06.25</div>
          </div>
        </div>
        <div className="communitypage-container__title">
          {props.detail.topicTitle}
        </div>
        <div className="communitypage-container__content">
          {props.detail.topicContents}
        </div>
        <div className="commuitypage-container__reaction">
          <span
            onClick={() => {
              setLike(like + 1);
            }}
          >
            👍
          </span>
          {like} <span>💬</span>0
        </div>
      </section>
    </>
  );
}
function PostReply() {
  <section className="communitypage-container"></section>;
}

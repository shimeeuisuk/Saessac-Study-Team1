import { useState } from "react";

export default function PostContent(props) {
  let [like, setLike] = useState(0);
  return (
    <>
      <section className="communitypage-container">
        <div className="communitypage-container__user">
          <div className="communitypage-user__img">
            <img
              className="user__img"
              src={`http://34.168.215.145/${props.detail.userPicture}`}
            />
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

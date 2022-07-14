import React from "react";
import { useState } from "react";

const Chat = () => {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);

  const onChange = (event) => setComment(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (comment === "") {
      return;
    }
    setCommentArray((commentValueList) => [comment, ...commentValueList]);
    setComment("");
  };

  return (
    <>
      <div className="chat-container" onSubmit={onSubmit}>
        <form className="chat-form">
          <input
            type="text"
            placeholder="소중한 의견을 나눠보아요!"
            value={comment}
            onChange={onChange}
          />
          <button type="submit">등록</button>
        </form>
      </div>
      <div>
        <ul className="comment">
          {commentArray.map((value, index) => (
            <li key={index} className="commentText">
              <div className="commentMargin">
                <span className="commnetNameBold"></span>
                {value}
              </div>
              <div className="commentStart">
                <i className="far fa-trash-alt" />
                <i className="fas fa-heart colorHeart" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Chat;

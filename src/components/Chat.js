import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getLoginCookie } from "../lib/cookie";

export const ChatContainer = styled.div`
  background: tomato;
`;

export const ChatList = styled.div`
  background: skyblue;
`;

export const ChatInput = styled.input`
  background: tomato;
`;

const Chat = ({ tid }) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(tid);
  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    axios
      .get(`http://34.168.215.145/topiccomments/${tid}`, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((res) => {
        setComment(res.data);
        setLoading(false);
        console.log(res.data);
      });
  };

  const handleInput = (e) => {
    const data = {
      topic_tid: e.tid,
      topiccomment: e.target.value,
    };
    if (e.key === "Enter") {
      console.log("dd");
      axios
        .post(`http://34.168.215.145/topiccomments/insert`, data, {
          headers: { Authorization: getLoginCookie() },
        })
        .then((res) => {
          getComments();
          res.target.value = "";
        });
    }
  };
  if (loading) return null;
  return (
    <ChatContainer>
      <ChatInput onChange={handleInput} onKeyUp={handleInput} />
      <ChatList>
        {comment.map((e, i) => (
          <div key={i}>
            {e.nickname}: {e.topicComent}
          </div>
        ))}
      </ChatList>
    </ChatContainer>
  );
};

export default Chat;

// console.log(props.detail.tid);
{
  /* <section>
<Chat tid={props.detail.tid}></Chat>
</section> */
}

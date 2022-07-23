import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getLoginCookie } from "../lib/cookie";
import { BsTrash } from "react-icons/bs";

export const ChatContainer = styled.div`
  background: tomato;
`;

export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: skyblue;
`;

export const ChatInput = styled.input`
  background: tomato;
`;

const BsTrashes = styled.div`
  cursor: pointer;
`;

const Chat = ({ tid }) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getComments();
  }, []);
  console.log(comment);
  const getComments = () => {
    axios
      .get(`http://34.168.215.145/topiccomments/${tid}`, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((res) => {
        setComment(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log("err"));
  };

  const deleteHandler = (tcid) => {
    console.log(tcid);
    // setComment(comment.filter((e) => e.tcid !== tcid));
    axios
      .delete(`http://34.168.215.145/topiccomments/${tcid}`, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((res) => {
        getComments();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    const data = {
      topic_tid: tid,
      topiccomment: e.target.value,
    };
    if (e.key === "Enter") {
      console.log("dd");
      axios
        .post(`http://34.168.215.145/topiccomments/insert`, data, {
          headers: { Authorization: getLoginCookie() },
        })
        .then((res) => {
          e.target.value = "";
          getComments();
          setLoading(false);
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
            <div>
              {e.nickname} : {e.topicComent}
            </div>
            <BsTrashes onClick={() => deleteHandler(e.tcid)}>
              <BsTrash />
            </BsTrashes>
          </div>
        ))}
      </ChatList>
    </ChatContainer>
  );
};

export default Chat;

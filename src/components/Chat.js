import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ChatPagination from "./ChatPagination";
import { getLoginCookie } from "../lib/cookie";
import { BsTrash } from "react-icons/bs";

const Container = styled.div`
  width: 810px;
  height: 500px;
`;
const CommentLength = styled.div`
  height: 38px;
  display: flex;
  border: 1px solid black;
  text-align: left;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
`;
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

const ChatForm = styled.div`
  border: 1px solid black;
  display: flex;
  height: 130px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }
`;

const Chat = ({ tid }) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    getComments();
  }, [page]);

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
    axios
      .delete(`http://34.168.215.145/topiccomments/${tcid}`, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((res) => {
        getComments();
        setLoading(false);
      })
      .catch((err) => {});
  };

  const handleInput = (e) => {
    const data = {
      topic_tid: tid,
      topiccomment: e.target.value,
    };
    if (e.key === "Enter") {
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
  // console.log(comment[0].userPicture);
  return (
    <Container>
      <CommentLength>댓글 {comment.length}</CommentLength>
      <ChatContainer>
        <ChatList>
          {comment.slice(offset, offset + limit).map((e, i) => (
            <ChatForm key={i}>
              <div>
                <img src={`http://34.168.215.145/${e.userPicture}`} />
                {e.nickname} : {e.topicComent}
              </div>
              <BsTrashes onClick={() => deleteHandler(e.tcid)}>
                <BsTrash />
              </BsTrashes>
            </ChatForm>
          ))}
        </ChatList>
        <ChatInput
          type="text"
          onChange={handleInput}
          onKeyPress={handleInput}
          placeholder="댓글 쓰기"
        />
        <div>
          <ChatPagination
            total={comment.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </ChatContainer>
    </Container>
  );
};

export default Chat;

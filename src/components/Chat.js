import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ChatPagination from "./ChatPagination";
import { useSelector } from "react-redux";
import { getLoginCookie } from "../lib/cookie";
import { BsTrash } from "react-icons/bs";

const Chat = ({ detail, tid, type }) => {
  const state = useSelector((state) => state.signinReducer);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textAreaComment, settextAreaComment] = useState("");

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  console.log(tid);
  useEffect(() => {
    getComments();
  }, [page]);

  console.log(state);
  const getComments = () => {
    axios
      .get(`http://34.168.215.145/topiccomments/${tid}`, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((res) => {
        setComment(res.data);
        setLoading(false);
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
  const clickHandler = (e) => {
    const data = {
      topic_tid: tid,
      topiccomment: textAreaComment,
    };
    axios
      .post(`http://34.168.215.145/topiccomments/insert`, data, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((res) => {
        setLoading(false);
        settextAreaComment("");
        getComments();
      });
  };

  const onChangeHandler = (e) => {
    settextAreaComment(e.target.value);
  };
  if (loading) return null;

  return (
    <Container>
      {type === "friend" ? (
        <CommentLengths>댓글 {comment.length}</CommentLengths>
      ) : (
        <CommentLength>댓글 {comment.length}</CommentLength>
      )}
      <ChatContainer>
        <ChatList>
          {comment.slice(offset, offset + limit).map((e, i) => (
            <ChatForm key={i}>
              <div className="mapp">
                <img src={`http://34.168.215.145/${e.userPicture}`} />
              </div>
              <div className="text">
                <p className="nickname">{e.nickname}</p>
                <p className="date">
                  {new Date(e.created_at).toLocaleString()}
                </p>
                <p className="coment">{e.topicComent}</p>
              </div>
              {state.loginState && state.data.userid === detail.userID ? (
                <BsTrashes onClick={() => deleteHandler(e.tcid)}>
                  <BsTrash />
                </BsTrashes>
              ) : null}
            </ChatForm>
          ))}
        </ChatList>
        {state.loginState ? (
          <ChatInputContainer>
            <div className="img">
              <img src={`http://34.168.215.145/${state.data.userPicture}`} />
              <p>{state.data.nickname}</p>
            </div>

            <div className="input">
              <textarea
                type="text"
                value={textAreaComment}
                onChange={onChangeHandler}
                onKeyPress={handleInput}
                placeholder="댓글 쓰기"
              />
              <div>
                <button onClick={clickHandler}>등록</button>
              </div>
            </div>
          </ChatInputContainer>
        ) : (
          "댓글 작성을 원하시면 로그인을 해주세요"
        )}
        <Pagination>
          <ChatPagination
            total={comment.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </Pagination>
      </ChatContainer>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  width: 810px;
  height: 1000px;
  margin-top: 10px;
`;
const CommentLength = styled.div`
  height: 38px;
  display: flex;
  border: 1px solid #a1a1a1;
  text-align: left;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
  background: #f5efff;
`;
const CommentLengths = styled.div`
  height: 38px;
  display: flex;
  border: 1px solid #a1a1a1;
  text-align: left;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
  background: #f3ffe3;
`;
export const ChatContainer = styled.div`
  width: 810px;
  height: 600px;
  background: white;
`;

export const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  width: 810px;
  height: 150px;
  border: 1px solid #a1a1a1;
  border-top: none;
  word-break: break-all;
  .img {
    display: flex;
    align-items: center;
    margin-right: 520px;
    width: 250px;
    height: 50px;
    > img {
      width: 30px;
      height: 30px;
      border-radius: 40px;
    }
    > p {
      padding-left: 10px;
      text-align: left;
      width: 150px;
    }
  }
  .input {
    margin-left: 30px;
    display: flex;
    width: 100%;
    height: 80px;
    > textarea {
      border: 1px solid #a1a1a1;
      background: white;
      resize: none;
      width: 700px;
      height: 80px;
    }
    > div {
      margin-left: 10px;
      margin-top: 45px;
      > button {
        border: 0;
        border-radius: 5px;
        background: black;
        width: 75px;
        height: 33px;
        font-size: 15px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        &:hover {
          background-color: tomato;
        }
      }
    }
  }
`;
export const ChatInput = styled.input``;

const BsTrashes = styled.div`
  cursor: pointer;
  margin-top: 10px;
`;

const ChatForm = styled.div`
  border: 1px solid #a1a1a1;
  border-top: none;
  display: flex;
  justify-content: flex-start;
  width: 810px;
  padding-bottom: 10px;
  padding-right: 10px;
  text-align: left;
  .mapp {
    display: flex;
    justify-content: flex-start;
    height: 40px;
    width: 40px;
    margin-left: 20px;
    margin-top: 10px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }
  }
  .text {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 15px;
    color: #414141;
    .nickname {
      display: flex;
      justify-self: flex-start;
      width: 100px;
      margin-right: auto;
      font-weight: 600;
    }
    .date {
      display: flex;
      justify-self: flex-start;
      width: 150px;
      font-size: 12px;
      color: #c0baba;
    }
    .coment {
      margin-top: 10px;
      margin-right: auto;
      word-break: break-all;
    }
  }
`;
const Pagination = styled.div`
  margin-top: 10px;
`;

import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FaAppStoreIos, FaCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostBox({ data }) {
  const [totalcomment, setTotalComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://34.168.215.145/topiccomments/count/${data.tid}`)
      .then((res) => {
        setTotalComment(res.data.count);
      });
  }, [data.tid]);

  return (
    <>
      <Container>
        <Top>
          <div
            className={
              data.type === "friend" ? "friendlocation" : "locationlocation"
            }
          >
            서울 {data.locationName}
          </div>
          {data.type === "friend" ? (
            <div
              className={
                data.recruit === "recruiting" ? "recruiting" : "recruited"
              }
            >
              {data.recruit === "recruiting" ? "모집중" : "모집완료"}
            </div>
          ) : null}
        </Top>
        <Middle>
          <Link
            to={`/postdetail/${data.tid}`}
            style={{ textDecoration: "none" }}
          >
            <Title>{data.topicTitle}</Title>
          </Link>
          <div className="createdAt">
            {new Date(data.created_at).toLocaleString()}
          </div>
        </Middle>
        <Bottom>
          <div className="bottomleft">
            <Img
              className="communitypage-bottom__thumb"
              src={`http://34.168.215.145/${data.userPicture}`}
            />
            <span className="usernickname">{data.nickName}</span>
          </div>

          <div className="bottomright">
            <FaCommentDots />
            <span className="totalcomment"> {totalcomment}</span>
          </div>
        </Bottom>
      </Container>
    </>
  );
}

const Container = styled.div`
  border: 2px solid #dfdfdf;
  border-radius: 1rem;
  width: 455px;
  height: 250px;
`;
const Top = styled.div`
  width: 455px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .friendlocation {
    margin-left: 18px;
    width: 100px;
    height: 37px;
    background-color: #b5eed4;
    border-radius: 2rem;
    color: #247f51;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .locationlocation {
    margin-left: 18px;
    width: 100px;
    height: 37px;
    background-color: #e5cbff;
    color: #7845af;
    font-weight: bold;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .recruiting {
    margin-right: 12px;
    width: 90px;
    height: 37px;
    background-color: #fbdbe7;
    color: #ea4c89;
    font-weight: bold;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .recruited {
    margin-right: 12px;
    width: 90px;
    height: 37px;
    background-color: #e2dfe1;
    color: #6f6f6f;
    font-weight: bold;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Middle = styled.div`
  width: 455px;
  height: 85px;
  display: flex;
  flex-direction: column;
  .createdAt {
    margin-top: 9px;
    display: flex;
    margin-left: 28px;
    font-size: 18px;
    font-weight: bold;
    color: #726f6f;
  }
`;
const Bottom = styled.div`
  width: 455px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottomleft {
    display: flex;
    align-items: center;
  }
  .bottomright {
    margin-top: 20px;
    margin-right: 25px;
  }
  .usernickname {
    color: #474545;
    font-size: 18px;
    font-weight: bold;
    margin-left: 15px;
  }
`;
const Title = styled.div`
  width: 230px;
  height: 35px;
  display: flex;
  text-align: left;
  margin-left: 28px;
  color: black;
  font-weight: bold;
  font-size: 25px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Img = styled.img`
  margin-left: 33px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

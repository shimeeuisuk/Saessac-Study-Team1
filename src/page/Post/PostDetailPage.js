import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FcSettings } from "react-icons/fc";
import { useSelector } from "react-redux";
import Chat from "components/Chat";
import useScroll from "util/useScroll";

export default function PostDetail() {
  const state = useSelector((state) => state.signinReducer);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let params = useParams();

  useScroll();

  useEffect(() => {
    axios.get(`https://saessac.kro.kr:80/topic/${params.id}`).then((res) => {
      const data = res.data[0];
      setDetail({ ...data });
      setLoading(false);
    });
  }, []);
  if (loading) return null;

  return (
    <Container>
      <Head>
        {detail.type === "friend" ? (
          <MateType
            onClick={() => {
              navigate("/postlist");
            }}
          >
            MATE
          </MateType>
        ) : (
          <LocationType
            onClick={() => {
              navigate("/postlist");
            }}
          >
            PLACE
          </LocationType>
        )}
        <Link to="/postwrite">
          <button className="button">글 작성하기</button>
        </Link>
      </Head>
      <Body>
        <Top>
          <div className="left">
            {loading ? null : (
              <img src={`https://saessac.kro.kr:80/${detail.userPicture}`} />
            )}
          </div>
          <div className="middle">
            <div className="nickname">{detail.nickName}</div>
            <div className="createdDate">
              {new Date(detail.created_at).toLocaleString()}
            </div>
          </div>
          <div className="right">
            <span
              className={
                detail.type === "friend" ? "matelocation" : "placelocation"
              }
            >
              서울 {detail.locationName}
            </span>
            {detail.type === "friend" ? (
              <span
                className={
                  detail.recruit === "recruiting" ? "recruiting" : "recruited"
                }
              >
                {detail.recruit === "recruiting" ? "모집중" : "모집완료"}
              </span>
            ) : null}
          </div>
        </Top>
        <Bottom>
          <Title>
            <span className="title">{detail.topicTitle}</span>
            {state.loginState && state.data.userid === detail.userID ? (
              <Link to={`/postedit/${detail.tid}`} state={{ detail: detail }}>
                <FcSettings className="setting" />
              </Link>
            ) : null}
          </Title>
          <Content>{detail.topicContents}</Content>
        </Bottom>
      </Body>
      <section>
        <Chat detail={detail} tid={detail.tid} type={detail.type} />
      </section>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 45px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  height: 62px;
  width: 810px;
  .button {
    margin-top: 15px;
    width: 127px;
    height: 42px;
    border-radius: 0.5rem;
    border: 1px solid black;
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;
const MateType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  padding-top: 5px;
  background-color: #c3ff75;
  vertical-align: center;
  height: 52px;
  width: 185px;
  transition: 0.3s;
  font-family: "Orbitron", sans-serif;
  font-weight: 800;
  box-shadow: 5px 5px black;
  margin-right: 22px;
  cursor: pointer;
`;
const LocationType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  padding-top: 5px;
  background-color: #a674fe;
  vertical-align: center;
  height: 52px;
  width: 185px;
  transition: 0.3s;
  font-family: "Orbitron", sans-serif;
  font-weight: 800;
  box-shadow: 5px 5px black;
  margin-right: 22px;
  cursor: pointer;
`;
const Body = styled.div`
  width: 810px;
  border: 1px solid #999999;
`;
const Top = styled.div`
  height: 80px;
  width: 810px;
  border: 1px solid #999999;
  display: flex;
  align-items: center;
  .left > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .middle {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .nickname {
    font-size: 18px;
    font-weight: bold;
  }
  .createdDate {
    font-size: 18px;
    font-weight: bold;
    color: #b5b1b1;
  }
  .right {
    margin-left: 270px;
    display: flex;
  }
  .matelocation {
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
  .placelocation {
    margin-left: 100px;
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
    margin-left: 10px;
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
    margin-left: 10px;
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

const Bottom = styled.div`
  width: 810px;
  border: 1px solid #999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Title = styled.div`
  width: 760px;
  border-bottom: 1px solid #999999;
  font-size: 30px;
  font-weight: bold;
  align-items: center;
  display: flex;
  justify-content: left;
  .title {
    min-height: 63px;
    word-break: break-all;
    align-items: center;
    display: flex;
    justify-content: left;
    width: 600px;
    text-align: left;
  }
  .setting {
    margin-left: 130px;
    width: 20px;
    height: 20px;
  }
`;

const Content = styled.div`
  min-height: 185px;
  word-break: break-all;
  margin-top: 10px;
  width: 760px;
  font-size: 15px;
  align-items: center;
  justify-content: start;
  display: flex;
  text-align: left;
`;

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DropBox from "../../components/DropBox";
import { Link, useNavigate } from "react-router-dom";
import { getLoginCookie } from "../../lib/cookie";
import { WriteModal } from "components/WriteModal";

const Container = styled.div`
  width: 800px;
  height: 900px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  height: 50px;
  width: 800px;
  border: 1px solid #0fa958;
  display: flex;
  align-items: center;
  .runningmate {
    margin: 0px 10px 0px 10px;
    display: flex;
    align-items: center;
  }
  .location {
    display: flex;
    align-items: center;
    margin-right: 340px;
  }
  .runningmate-text {
    margin-left: 10px;
  }
  .location-text {
    margin-left: 10px;
  }
  .active {
    width: 30px;
    height: 30px;
    background-color: #0fa958;
    border-radius: 100%;
    cursor: pointer;
  }
  .deactive {
    width: 30px;
    height: 30px;
    background-color: #d9d9d9;
    border-radius: 100%;
    cursor: pointer;
  }
`;

const Title = styled.input`
  height: 80px;
  width: 800px;
  border: 1px solid #0fa958;
`;

const Content = styled.input`
  width: 800px;
  height: 650px;
  border: 1px solid #0fa958;
`;

const Foot = styled.div`
  width: 800px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    &:hover {
      border: 2px solid white;
    }
    cursor: pointer;
    margin: 0px 30px 0px 30px;
  }
  .complete {
    width: 80px;
    height: 40px;
    border-radius: 5rem;
    background-color: #0fa958;
    border: 0.5px solid #0fa958;
    color: white;
  }
  .cancel {
    width: 80px;
    height: 40px;
    border-radius: 5rem;
    background-color: #d9d9d9;
    border: 0.5px solid #d9d9d9;
  }
`;

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [active, setActive] = useState(0);
  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/location/list");
      setLocation([...res.data]);
    })();
  }, []);

  const sendPost = () => {
    const selectedlocation = location.filter((el) => {
      return el.locationName === selected;
    });

    axios
      .post(
        "http://34.168.215.145/topic/insert",
        {
          topictitle: title,
          topiccontents: content,
          location_lid: selectedlocation[0].lid,
          type: active === 0 ? "friend" : "location",
        },
        { headers: { Authorization: getLoginCookie() } }
      )
      .then((msg) => {
        console.log(msg);
        navigate("/postlist");
      });
  };

  return (
    <Container>
      <Head>
        <div className="runningmate">
          <div
            className={active === 0 ? "active" : "deactive"}
            onClick={() => {
              setActive(0);
            }}
          ></div>
          <div className="runningmate-text">런닝메이트 구합니다!</div>
        </div>
        <div className="location">
          <div
            className={active === 1 ? "active" : "deactive"}
            onClick={() => {
              setActive(1);
            }}
          ></div>
          <div className="location-text">런닝 장소 추천합니다!</div>
        </div>
        <DropBox setSelected={setSelected} location={location} />
      </Head>
      <Title
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="제목"
      ></Title>
      <Content
        required
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="내용을 입력해 주세요"
      ></Content>
      <Foot>
        <button
          className="complete"
          onClick={
            title === "" || content === "" || selected === ""
              ? openModal
              : sendPost
          }
        >
          완료
        </button>

        <Link to="/postlist">
          <button className="cancel">취소</button>
        </Link>
        {modalOpen ? (
          <WriteModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        ) : null}
      </Foot>
    </Container>
  );
}

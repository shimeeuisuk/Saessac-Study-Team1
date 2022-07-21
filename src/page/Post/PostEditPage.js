import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DropBox from "../../components/DropBox";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getLoginCookie } from "../../lib/cookie";

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
    margin-right: 150px;
  }
  .runningmate-text {
    margin-left: 10px;
  }
  .location-text {
    margin-left: 10px;
  }
  .recruit {
    width: 150px;
    height: 40px;
    background-color: #d9d9d9;
    border-radius: 5rem;
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
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

export default function PostEditPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState("");
  const [recruit, setRecruit] = useState("");
  const [tid, setTid] = useState(0);
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/location/list");
      setLocation([...res.data]);
    })();
  }, []);

  useEffect(() => {
    axios.get(`http://34.168.215.145/topic/${params.id}`).then((res) => {
      const data = { ...res.data[0] };
      setTitle(data.topicTitle);
      setContent(data.topicContents);
      setType(data.type);
      setRecruit(data.recruit);
      setTid(data.tid);
      console.log(tid);
      // setLoading(false);
    });
  }, []);

  const editPost = () => {
    const selectedlocation = location.filter((el) => {
      return el.locationName === selected;
    });
    const putForm = {
      topictitle: title,
      topiccontents: content,
      recruit: recruit,
      location_lid: selectedlocation[0].lid,
    };
    console.log(selected);
    console.log(putForm);
    axios
      .put(`http://34.168.215.145/topic/${tid}`, putForm, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((msg) => {
        navigate("/postlist");
        console.log(msg);
      });
  };

  return (
    <Container>
      <Head>
        <div className="runningmate">
          <div className={type === "friend" ? "active" : "deactive"}></div>
          <div className="runningmate-text">런닝메이트 구합니다!</div>
        </div>
        <div className="location">
          <div className={type === "location" ? "active" : "deactive"}></div>
          <div className="location-text">런닝 장소 추천합니다!</div>
        </div>
        {type === "friend" ? (
          <div
            className="recruit"
            onClick={() => {
              if (recruit === "recruited") {
                setRecruit("recruting");
              } else {
                setRecruit("recruited");
              }
            }}
          >
            {recruit === "recruited" ? "모집완료" : "모집중"}
          </div>
        ) : null}
        <DropBox setSelected={setSelected} location={location} />
      </Head>
      <Title
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        // placeholder={detail.topicTitle}
      ></Title>
      <Content
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="내용을 입력해 주세요"
      ></Content>
      <Foot>
        <button className="complete" onClick={editPost}>
          수정
        </button>

        <Link to="/postlist">
          <button className="cancel">취소</button>
        </Link>
      </Foot>
    </Container>
  );
}

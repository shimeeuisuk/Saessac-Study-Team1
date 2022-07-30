import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LocationDropBox from "components/LocationDropBox";
import { useNavigate } from "react-router-dom";
import { getLoginCookie } from "../../lib/cookie";
import { WriteModal } from "components/WriteModal";
import TypeDropBox from "components/TypeDropBox";
import { useSelector } from "react-redux";
import WriteCancelModal from "components/WriteCancelModal";
import useScroll from "util/useScroll";

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [locations, setLocation] = useState([]);
  const [selected, setSelected] = useState("");
  const [writeModal, setWriteModal] = useState(false);
  const [writeCancelModal, setWriteCancelModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const state = useSelector((state) => state.signinReducer);
  const navigate = useNavigate();

  useScroll();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/location/list");
      setLocation([...res.data]);
    })();
  }, []);

  const sendPost = () => {
    const selectedlocation = locations.filter((el) => {
      return el.locationName === selected;
    });

    axios
      .post(
        "http://34.168.215.145/topic/insert",
        {
          topictitle: title,
          topiccontents: content,
          location_lid: selectedlocation[0].lid,
          type:
            selectedType === "런닝 메이트를 찾아요!" ? "friend" : "location",
        },
        { headers: { Authorization: getLoginCookie() } }
      )
      .then((msg) => {
        navigate("/postlist");
      });
  };

  return (
    <Container>
      <Box>
        <div className="newpost">새 글 쓰기</div>
        <Top>
          <img src={`http://34.168.215.145/${state.data.userPicture}`} />
          <span className="usernickname">{state.data.nickname}</span>
        </Top>
        <Bottom>
          <TypeDropBox setSelectedType={setSelectedType} />
          <LocationDropBox setSelected={setSelected} locations={locations} />
          <input
            className="title"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="제목을 입력해 주세요"
          ></input>
          <textarea
            className="content"
            required
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="내용을 입력해 주세요"
          ></textarea>
          <Buttons>
            <button
              className="cancel"
              onClick={() => {
                setWriteCancelModal(true);
              }}
            >
              취소
            </button>
            <button
              className="post"
              onClick={
                title === "" ||
                content === "" ||
                selected === "" ||
                selectedType === ""
                  ? () => {
                      setWriteModal(true);
                    }
                  : sendPost
              }
            >
              등록
            </button>
          </Buttons>
        </Bottom>
        {writeModal ? (
          <WriteModal writeModal={writeModal} setWriteModal={setWriteModal} />
        ) : null}
        {writeCancelModal ? (
          <WriteCancelModal
            writeCancelModal={writeCancelModal}
            setWriteCancelModal={setWriteCancelModal}
          />
        ) : null}
      </Box>
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
const Box = styled.div`
  width: 810px;
  height: 770px;
  .newpost {
    width: 130px;
    height: 35px;
    font-size: 30px;
    font-weight: bold;
  }
`;
const Top = styled.div`
  margin-top: 15px;
  width: 810px;
  height: 70px;
  border: 2px solid #999999;
  display: flex;
  align-items: center;
  justify-content: left;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .usernickname {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 28px;
  width: 810px;
  height: 625px;
  border: 2px solid #999999;
  .typedropbox {
    margin-top: 35px;
    width: 715px;
    height: 35px;
    border: 2px solid #999999;
  }
  .title {
    margin-top: 10px;
    width: 715px;
    height: 35px;
    border: 2px solid #999999;
  }
  .content {
    margin-top: 15px;
    width: 715px;
    height: 325px;
    border: 2px solid #999999;
    resize: none;
  }
  input::placeholder {
    padding-left: 10px;
  }
  textarea::placeholder {
    padding-left: 10px;
    padding-top: 150px;
  }
`;
const Buttons = styled.div`
  margin-top: 60px;
  width: 715px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  .cancel {
    background-color: white;
    border: 1px solid #999999;
    border-radius: 0.5rem;
    width: 70px;
    height: 30px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      transform: scale(0.95);
    }
  }
  .post {
    background-color: black;
    border: 1px solid black;
    border-radius: 0.5rem;
    color: white;
    width: 70px;
    height: 30px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      transform: scale(0.95);
    }
  }
`;

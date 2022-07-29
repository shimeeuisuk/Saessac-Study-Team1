import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LocationDropBox from "components/LocationDropBox";
import { useNavigate } from "react-router-dom";
import { getLoginCookie } from "../../lib/cookie";
import { useLocation } from "react-router-dom";
import EditCancelModal from "components/EditCacelModal";
import { WriteModal } from "components/WriteModal";
import DeleteModal from "components/DeleteModal";

export default function PostEditPage() {
  const loaction = useLocation();
  const data = loaction.state.detail;
  const [selected, setSelected] = useState(data.locationName);
  const [title, setTitle] = useState(data.topicTitle);
  const [content, setContent] = useState(data.topicContents);
  const [locations, setLocation] = useState([]);
  const [recruit, setRecruit] = useState(data.recruit);
  const [editCancelModal, setEditCancelModal] = useState(false);
  const [writeModal, setWriteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const recruitHandler = () => {
    if (recruit === "recruited") {
      setRecruit("recruiting");
    } else {
      setRecruit("recruited");
    }
  };
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/location/list");
      setLocation([...res.data]);
    })();
  }, []);

  const editPost = () => {
    const selectedlocation = locations.filter((el) => {
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
      .put(`http://34.168.215.145/topic/${data.tid}`, putForm, {
        headers: { Authorization: getLoginCookie() },
      })
      .then((msg) => {
        navigate("/postlist");
        console.log(msg);
      });
  };

  return (
    <Container>
      <Box>
        <div className="newpost">글 수정</div>
        <Top>
          <img src={`http://34.168.215.145/${data.userPicture}`} />
          <span className="usernickname">{data.nickName}</span>
          {data.type === "friend" ? (
            <div className={recruit} onClick={recruitHandler}>
              {recruit === "recruiting" ? "모집중" : "모집완료"}
            </div>
          ) : null}
        </Top>
        <Bottom>
          <div className="typedropbox">
            {data.type === "friend"
              ? "런닝 메이트를 찾아요!"
              : "런닝 장소를 추천하고 싶어요!"}
          </div>
          <LocationDropBox
            selected={selected}
            setSelected={setSelected}
            locations={locations}
          />
          <Title
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            defaultValue={title}
          ></Title>
          <Content
            required
            onChange={(e) => {
              setContent(e.target.value);
            }}
            defaultValue={content}
          ></Content>
          <Buttons>
            <button
              className="delete"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              삭제
            </button>
            <button
              className="cancel"
              onClick={() => {
                setEditCancelModal(true);
              }}
            >
              취소
            </button>
            <button
              className="post"
              onClick={
                title === "" || content === ""
                  ? () => {
                      setWriteModal(true);
                    }
                  : editPost
              }
            >
              등록
            </button>
          </Buttons>
        </Bottom>
        {deleteModal ? (
          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            data={data}
          />
        ) : null}
        {writeModal ? (
          <WriteModal writeModal={writeModal} setWriteModal={setWriteModal} />
        ) : null}

        {editCancelModal ? (
          <EditCancelModal
            editCancelModal={editCancelModal}
            setEditCancelModal={setEditCancelModal}
          />
        ) : null}
      </Box>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 45px;
  width: 100%;
  height: 1024px;
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
  .recruiting {
    margin-left: 500px;
    width: 90px;
    height: 37px;
    background-color: #fbdbe7;
    color: #ea4c89;
    font-weight: bold;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .recruited {
    margin-left: 500px;
    width: 90px;
    height: 37px;
    background-color: #e2dfe1;
    color: #6f6f6f;
    font-weight: bold;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
    text-indent: 10px;
    display: flex;
    align-items: center;
    margin-top: 35px;
    width: 715px;
    height: 35px;
    border: 2px solid #999999;
  }
`;
const Buttons = styled.div`
  margin-top: 60px;
  width: 715px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  .delete {
    background-color: #ff5045;
    border: 1px solid #ff5045;
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
  .cancel {
    margin-left: 470px;
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
const Title = styled.input`
  text-indent: 10px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 715px;
  height: 35px;
  border: 2px solid #999999;
`;
const Content = styled.input`
  text-indent: 10px;
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 715px;
  height: 325px;
  border: 2px solid #999999;
`;

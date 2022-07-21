import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { DeleteModal } from "components/DeleteModal";

const Container = styled.div`
  width: 800px;
  height: 900px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  width: 760px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .type {
    width: 250px;
    height: 40px;
    background-color: #0fa958;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .recruit {
    width: 150px;
    height: 40px;
    background-color: #d9d9d9;
    border-radius: 5rem;
  }
`;

const Title = styled.div`
  height: 60px;
  width: 760px;
  border: 1px solid #0fa958;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 20px;
  width: 760px;
  height: 350px;
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
  .edit {
    width: 80px;
    height: 40px;
    border-radius: 5rem;
    background-color: #0fa958;
    border: 0.5px solid #0fa958;
    color: white;
  }
  .delete {
    width: 80px;
    height: 40px;
    border-radius: 5rem;
    background-color: #d9d9d9;
    border: 0.5px solid #d9d9d9;
  }
`;

export default function PostDetail() {
  const [detail, setDetail] = useState({});
  // const [Loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  let params = useParams();

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    axios.get(`http://34.168.215.145/topic/${params.id}`).then((res) => {
      const data = res.data[0];
      setDetail({ ...data });

      // setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Head>
        <div className="type">
          {detail.type === "friend"
            ? "런닝메이트 구합니다!"
            : "런닝 장소 추천합니다!"}
        </div>

        {detail.type === "friend" ? (
          <div className="recruit">
            {detail.recruit === "recruiting" ? "모집중" : "모집완료"}
          </div>
        ) : null}
      </Head>
      <Title>{detail.topicTitle}</Title>
      <Content>{detail.topicContents}</Content>
      <Foot>
        <Link to={`/postedit/${detail.tid}`}>
          <button className="edit">수정</button>
        </Link>
        <button className="delete" onClick={openModal}>
          삭제
        </button>
        {modalOpen ? (
          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            detail={detail}
          />
        ) : null}
      </Foot>
    </Container>
  );
}

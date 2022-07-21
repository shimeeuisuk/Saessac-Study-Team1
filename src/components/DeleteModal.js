import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Deletemodal = styled.div`
  background-color: red;
  border: 5px solid blue;
  color: white;
`;

export function DeleteModal({ modalOpen, setModalOpen, detail }) {
  const navigate = useNavigate();
  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(detail.tid);
  const DeletePost = () => {
    axios.delete(`http://34.168.215.145/topic/${detail.tid}`).then((res) => {
      closeModal();
      console.log(res);
      console.log(modalOpen);
      navigate("/postlist");
    });
  };

  return (
    <>
      <Deletemodal>
        <div>진짜 삭제할거야? 다시 생각 안해도 되겠어?</div>

        <button onClick={DeletePost}>응~ 할거야~</button>

        <button onClick={closeModal}>취소</button>
      </Deletemodal>
    </>
  );
}

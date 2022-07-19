import styled from "styled-components";

const Writemodal = styled.div`
  background-color: red;
  border: 5px solid blue;
  color: white;
`;

export function WriteModal({ modalOpen, setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Writemodal>
        <div>제목과 내용을 작성하세요</div>
        <button onClick={closeModal}>확인</button>
      </Writemodal>
    </>
  );
}

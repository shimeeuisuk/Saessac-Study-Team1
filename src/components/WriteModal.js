import styled from "styled-components";
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;
const Container = styled.div`
  width: 360px;
  height: 200px;
  background-color: white;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .comment {
    font-size: 18px;
  }
  .check {
    margin-top: 15px;
    margin-bottom: 5px;
    width: 80px;
    height: 35px;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 0.5rem;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
      border: 1px solid white;
    }
  }
`;

export function WriteModal({ WriteModal, setWriteModal }) {
  const closeModal = () => {
    setWriteModal(false);
  };

  return (
    <ModalBackdrop>
      <Container>
        <div className="comment">
          제목과 내용을 작성하시고, <br />
          게시물 종류와 지역 선택을 완료해주시길 <br />
          바랍니다!
        </div>
        <button className="check" onClick={closeModal}>
          확인
        </button>
      </Container>
    </ModalBackdrop>
  );
}

import styled from "styled-components";

export default function TypeDropBox({ setSelectedType }) {
  return (
    <Select
      onChange={(e) => {
        setSelectedType(e.target.value);
      }}
    >
      <option key="000">게시판 종류를 선택해 주세요.</option>
      <option key="001">런닝 메이트를 찾아요!</option>
      <option key="002">런닝 장소를 추천하고 싶어요!</option>
    </Select>
  );
}
const Select = styled.select`
  margin-top: 10px;
  width: 715px;
  height: 35px;
  border: 2px solid #999999;
`;

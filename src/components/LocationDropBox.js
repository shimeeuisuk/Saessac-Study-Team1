import styled from "styled-components";

export default function LocationDropBox({ locations, setSelected, selected }) {
  return (
    <Select
      onChange={(e) => {
        setSelected(e.target.value);
      }}
    >
      <option key="000">
        {selected === undefined ? "지역을 선택해 주세요." : selected}
      </option>
      {locations.map((el, idx) => {
        return <option key={idx}>{el.locationName}</option>;
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-top: 10px;
  width: 715px;
  height: 35px;
  border: 2px solid #999999;
`;

export default function DropBox({ location, setSelected }) {
  return (
    <div>
      <select
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      >
        <option key="000">지역 선택</option>
        {location.map((el, idx) => {
          return <option key={idx}>{el.locationName}</option>;
        })}
      </select>
    </div>
  );
}

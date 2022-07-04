import "./yearMonthBut.css";

export default function YearMonthBut({ countY, countM, setCountY, setCountM }) {
  let date = new Date(
    new Date().getFullYear() + countY,
    new Date().getMonth() + countM,
    new Date().getDate()
  );

  let out = (
    <>
      <div className="hed">
        <span onClick={() => setCountY(countY - 1)}>&#8656;</span>
        <h2>{date.getFullYear()}</h2>
        <span onClick={() => setCountY(countY + 1)}>&#8658;</span>
      </div>
      <div className="hed">
        <span onClick={() => setCountM(countM - 1)}>&#8656;</span>
        <h2>{date.toDateString().split(" ")[1]}</h2>
        <span onClick={() => setCountM(countM + 1)}>&#8658;</span>
      </div>
    </>
  );

  return out;
}

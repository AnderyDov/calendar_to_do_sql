import "./calendar.css";
import YearMonthBut from "../yearMonthBut/YearMonthBut";
import Table from "../table/Table";

export default function Calendar({
  countY,
  countM,
  currentD,
  setCurrentD,
  setCountY,
  setCountM,
  base,
}) {
  let out = (
    <div className="calendar">
      <YearMonthBut
        countY={countY}
        countM={countM}
        setCountY={setCountY}
        setCountM={setCountM}
      />
      <Table
        countY={countY}
        countM={countM}
        currentD={currentD}
        setCurrentD={setCurrentD}
        base={base}
      />
    </div>
  );

  return out;
}

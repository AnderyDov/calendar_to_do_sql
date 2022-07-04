import "./table.css";
import Cell from "../cell/Cell";

export default function Table({ countY, countM, currentD, setCurrentD, base }) {
  let date = new Date(
    +new Date().getFullYear() + countY,
    +new Date().getMonth() + countM,
    +new Date().getDate()
  );

  let year = date.getFullYear();
  let month = date.getMonth();
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();
  let beforeDate = new Date(year, month, 0).getDate();
  let beforeDay = new Date(year, month, 0).getDay();
  let ar = [];

  for (let i = 1; i <= lastDate; i++) {
    ar.push(i);
  }
  for (
    let i = 1, k = beforeDate;
    i < firstDay, k > beforeDate - beforeDay;
    i++, k--
  ) {
    ar.unshift(k.toString());
  }
  for (let i = ar.length, k = 1; i < 42; i++, k++) {
    ar.push(k.toString());
  }

  let res = [[], [], [], [], [], []];

  for (let i = 0; i < ar.length; i++) {
    if (i < 7) res[0].push(ar[i]);
    if (i >= 7 && i < 14) res[1].push(ar[i]);
    if (i >= 14 && i < 21) res[2].push(ar[i]);
    if (i >= 21 && i < 28) res[3].push(ar[i]);
    if (i >= 28 && i < 35) res[4].push(ar[i]);
    if (i >= 35 && i < 42) res[5].push(ar[i]);
  }

  let out = res.map((item, index) => {
    let week = item.map((el, i) => {
      let clicked = typeof el === "number" ? true : false;
      return (
        <Cell
          key={i}
          countY={countY}
          countM={countM}
          currentD={currentD}
          setCurrentD={setCurrentD}
          value={el}
          clicked={clicked}
          base={base}
        />
      );
    });
    return <tr key={index}>{week}</tr>;
  });
  out = (
    <table>
      <tbody>{out}</tbody>
    </table>
  );

  return out;
}

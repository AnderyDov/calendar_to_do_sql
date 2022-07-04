export default function Cell({
  countY,
  countM,
  currentD,
  setCurrentD,
  value,
  clicked,
  base,
}) {
  let date = new Date(
    new Date().getFullYear() + countY,
    new Date().getMonth() + countM,
    currentD
  );
  date = `${value} ${date.toDateString().split(" ")[1]} ${date.getFullYear()}`;

  let isTask = {};
  if (checkIsTask(date) && typeof value === "number") {
    isTask.background = "rgba(3, 253, 3, 0.637)";
  }
  if (value === +new Date().getDate()) {
    isTask.border = "2px solid red";
  }

  let out = (
    <td onClick={() => editCurrentD()} style={isTask}>
      {value}
    </td>
  );

  function checkIsTask(date) {
    return base.some((item) => item.date === date);
  }

  function editCurrentD() {
    if (clicked) setCurrentD(+value);
  }

  return out;
}

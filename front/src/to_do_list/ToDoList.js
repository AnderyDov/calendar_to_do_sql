import { useEffect, useState } from "react";
import "./toDoList.css";

export default function ToDoList({
  countY,
  countM,
  currentD,
  base,
  setBase,
  name,
  setAccess,
}) {
  let [addTask, setAddTask] = useState(false);
  let [editTask, setEditTask] = useState(false);
  let [targetId, setTargetId] = useState(null);
  let [text, setText] = useState("");

  let date = new Date(
    new Date().getFullYear() + countY,
    new Date().getMonth() + countM,
    currentD
  );
  date = `${currentD} ${
    date.toDateString().split(" ")[1]
  } ${date.getFullYear()}`;

  let showListEdit;

  showListEdit = [...base].map((item) => {
    if (item.date === date) {
      return (
        <li key={item.id}>
          <div onClick={() => handlerEdit(item.id)}>{item.text}</div>
          <button onClick={() => handlerDel(item.id)}>удалить</button>
        </li>
      );
    }
  });

  let textFeld = addTask && (
    <textarea
      cols="30"
      rows="10"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );

  let butSaveEdit = editTask && (
    <button onClick={handlerSave}>сохранить изменения</button>
  );

  let butEditAdd;
  if (addTask) {
    butEditAdd = <button onClick={handlerAdd}>добавить в список</button>;
  } else {
    butEditAdd = (
      <button onClick={() => setAddTask(true)}>добавить задачу</button>
    );
  }

  let butOut = (addTask || editTask) && (
    <button onClick={handlerOut}>отмена</button>
  );

  useEffect(() => {
    fetch("/base", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((res) => setBase(res));
  }, []);

  let butLogOut = (
    <p>
      <button onClick={() => setAccess(false)}>выход</button>
    </p>
  );

  let out = (
    <div className="toDoList">
      <h3>Список дел на: {date}</h3>
      {textFeld}
      {butSaveEdit}
      {butEditAdd}
      {butOut}
      {showListEdit}
      {butLogOut}
    </div>
  );

  function handlerAdd() {
    if (text !== "") {
      fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          text: text,
          date: date,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setBase(res);
          setAddTask(false);
          setEditTask(false);
          setText("");
        });
    }
  }

  function handlerDel(id) {
    fetch("/del", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => setBase(res));
  }

  function handlerEdit(id) {
    setAddTask(true);
    setEditTask(true);
    setTargetId(id);
    base.forEach((item) => {
      if (item.id === id) setText(item.text);
    });
  }

  function handlerSave() {
    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
        text: text,
        id: targetId,
      }),
    })
      .then((res) => res.json())
      .then((res) => setBase(res));
    setAddTask(false);
    setEditTask(false);
    setText("");
  }

  function handlerOut() {
    setAddTask(false);
    setEditTask(false);
    setText("");
    setTargetId(null);
  }

  return out;
}

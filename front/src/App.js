import { useState } from "react";
import "./App.css";
import Calendar from "./calendar/Calendar";
import ToDoList from "./to_do_list/ToDoList";
import Form from "./form/Form";

function App() {
  let [countY, setCountY] = useState(0);
  let [countM, setCountM] = useState(0);
  let [currentD, setCurrentD] = useState(new Date().getDate());
  let [base, setBase] = useState([]);
  let [name, setName] = useState("");
  let [access, setAccess] = useState(false);

  let out = access ? (
    <ToDoList
      countY={countY}
      countM={countM}
      currentD={currentD}
      base={base}
      setBase={setBase}
      name={name}
      setName={setName}
      access={access}
      setAccess={setAccess}
    />
  ) : (
    <Form access={access} setAccess={setAccess} name={name} setName={setName} />
  );

  return (
    <div className="App">
      {out}
      <Calendar
        countY={countY}
        countM={countM}
        currentD={currentD}
        setCurrentD={setCurrentD}
        setCountY={setCountY}
        setCountM={setCountM}
        base={base}
      />
    </div>
  );
}

export default App;

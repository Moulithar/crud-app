import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import List from "./List";
import axios from "axios";
import { baseurl } from "./utlis/constants";

function App() {
  const [input, setInput] = useState();
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseurl}/get`).then((res) => {
      console.log("hello", res?.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  // useEffect(() => {
  //   axios.get(`${baseurl}/get`).then((res) => {
  //     console.log("hello", res?.data);
  //   });
  // }, []);

  const addTask = () => {
    axios.post(`${baseurl}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateId((prevState) => !prevState);
    });
  };
  const updateTask = () => {
    axios.put(`${baseurl}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setInput("");
      setUpdateId(null);
    });
  };
  const updateMode = (id, text) => {
    console.log(text);
    setInput("this is edited");
    setUpdateId(id);
    // axios.post(`${baseurl}/save`, { task: input }).then((res) => {
    //   console.log(res.data);
    //   setInput("");
    //   setInput("");
    //   setUpdateUI((prevState) => !prevState);
    // });
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>CRUD APP</h1>
        <div>
          <input
            placeholder="Enter your value"
            style={{ fontSize: "20px" }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            style={{ fontSize: "20px", margin: "0px 10px" }}
            onClick={() => {
              updateId ? updateTask() : addTask();
            }}
          >
            {updateId ? "updateTask" : "add task"}
          </button>
          {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
          <ul>
            {tasks.map((task) => {
              return (
                <List
                  key={task._id}
                  id={task._id}
                  task={task.task}
                  setUpdateUI={setUpdateUI}
                  updateMode={updateMode}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

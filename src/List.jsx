import axios from "axios";
import React from "react";
import { baseurl } from "./utlis/constants";

const List = ({ task, id, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.post(`${baseurl}/delete/${id}`).then((res) => {
      console.log("hola amigo", res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <h1> {task}</h1>

      <h4 onClick={() => updateMode(id, task)}>Edit</h4>
      <h4 onClick={removeTask}>Delete</h4>
    </div>
  );
};

export default List;

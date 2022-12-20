import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskPopUp = ({ setTask }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const makeTask = async e => {
    e.preventDefault();
    if (!text || !date) {
      toast.error("Task and date are both required");
      return;
    }
    let token = localStorage.getItem("token");
    try {
      const toMils = Date.parse(date);
      if (toMils < Date.now()) {
        console.log("Only future events");
      }
      const dateDB = new Date(toMils).toLocaleString();
      await axios.patch("http://127.0.0.1:4000/user/createTask", {
        task: {
          text,
          dateDB,
        },
        token,
      });
    } catch (err) {
      toast.error("Something went wrong, please try again");
    }
    setText("");
    setDate("");
    setTask(false);
  };

  return (
    <div className="overlay" onClick={() => setTask(false)}>
      <div className="task_form-container" onClick={e => e.stopPropagation()}>
        <form className="task_form" onSubmit={makeTask}>
          <div className="task_form-task">
            <label>New Task:</label>
            <input
              type="text"
              placeholder="Your new task..."
              onChange={e => setText(e.target.value)}
            ></input>
          </div>
          <div className="task_form-date">
            <label>Date:</label>
            <input
              type="datetime-local"
              onChange={e => setDate(e.target.value)}
            ></input>
          </div>
          <button className="task_form-btn">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopUp;

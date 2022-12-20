import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskBox = ({ task }) => {
  const handleSelect = async textDB => {
    try {
      let token = localStorage.getItem("token");
      await axios.patch("http://127.0.0.1:4000/user/deleteTask", {
        textDB,
        token,
      });
    } catch (err) {
      toast.error("Something went wrong,please try again");
    }
  };

  return (
    <div className="task__box" id="task_box">
      <p className="task">{`${task.text}: ${task.dateDB} `}</p>
      <button className="remove-btn" onClick={() => handleSelect(task.text)}>
        Remove Task
      </button>
    </div>
  );
};

export default TaskBox;

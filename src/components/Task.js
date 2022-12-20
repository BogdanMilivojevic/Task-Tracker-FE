import React, { useEffect, useState } from "react";
import TaskBox from "./TaskBox";
import TaskPopUp from "./TaskPopUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Task = () => {
  const [task, setTask] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [taskarr, setTaskarr] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let container = [];

    const getUser = async () => {
      try {
        const user = await axios.post("http://127.0.0.1:4000/user/getUser", {
          token,
        });
        setUsername(user.data.user.username);
        if (user.data.user.tasks) {
          user.data.user.tasks.map(el => container.push(el));
          setTaskarr(container);
        }
      } catch (err) {
        toast.error("Something went wrong,please reload page or login again");
      }
    };
    getUser();
  }, [taskarr]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="task__container">
      <div className="task__navbar">
        <h1>Task Tracker</h1>
        <div className="user__info">
          {username && <h1 className="user__name">{username.toUpperCase()}</h1>}
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="task__grid">
        {taskarr.length > 0 && taskarr.map(task => <TaskBox task={task} />)}
      </div>
      <button className="add-btn" onClick={() => setTask(true)}>
        Add Task
      </button>
      {task && <TaskPopUp setTask={setTask} />}
    </div>
  );
};

export default Task;

import React, { useState } from "react";
import task from "../img/task-hero.jpg";
import LoginPopUp from "./LoginPopUp";
import RegisterPopUp from "./RegisterPopUp";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [regsiter, setRegister] = useState(false);

  return (
    <div className="login__container">
      <div className="login__navbar">
        <h1>Task Tracker</h1>
        <div className="navbar__buttons">
          <button className="login-btn" onClick={() => setLogin(true)}>
            Login
          </button>
          <button className="register-btn" onClick={() => setRegister(true)}>
            Register
          </button>
        </div>
      </div>
      <div className="login__grid">
        <h1>Stay Organized with the Task Tracker</h1>
        <img src={task} />
      </div>
      <div className="login__footer">
        <h1>Task Tracker - all rights reserved</h1>
      </div>
      {login && <LoginPopUp setLogin={setLogin} />}
      {regsiter && <RegisterPopUp setRegister={setRegister} />}
    </div>
  );
};

export default Login;

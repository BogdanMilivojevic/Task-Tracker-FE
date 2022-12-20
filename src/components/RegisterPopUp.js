import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPopUp = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const registerUser = async e => {
    e.preventDefault();
    try {
      const user = await axios({
        method: "POST",
        url: "http://127.0.0.1:4000/user/register",
        data: {
          email,
          password,
          passwordConfirm,
          username,
        },
      });
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setUsername("");
      setRegister(false);
      navigate("/task");
      localStorage.setItem("token", user.data.token);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="overlay" onClick={() => setRegister(false)}>
      <div className="register_popup" onClick={e => e.stopPropagation()}>
        <h1>Register your account</h1>
        <form className="register_form" onSubmit={registerUser}>
          <div className="register_email_label">
            <label>EMAIL:</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="register_password_label">
            <label>PASSWORD:</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="password_confirm_label">
            <label>CONFIRM PASSWORD:</label>
            <input
              type="password"
              placeholder="Your password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="username_label">
            <label>USERNAME:</label>
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <button className="form_login-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopUp;

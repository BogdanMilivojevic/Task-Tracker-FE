import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPopUp = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async e => {
    e.preventDefault();
    try {
      const user = await axios.post("http://127.0.0.1:4000/user/login", {
        email,
        password,
      });
      setEmail("");
      setPassword("");
      setLogin(false);
      navigate("/task");
      localStorage.setItem("token", user.data.token);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="overlay" onClick={() => setLogin(false)}>
      <div className="login_popup" onClick={e => e.stopPropagation()}>
        <h1>Login into your account</h1>
        <form className="login_form" onSubmit={loginUser}>
          <div className="email_label">
            <label>EMAIL:</label>
            <input
              type="email"
              placeholder="Your email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="password_label">
            <label>PASSWORD:</label>
            <input
              type="password"
              placeholder="Your password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="form_login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;

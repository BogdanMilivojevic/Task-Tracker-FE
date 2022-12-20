import Login from "./components/Login";
import Task from "./components/Task";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Login />{" "}
            <ToastContainer position="top-center" closeOnClick rtl={false} />
          </div>
        }
      />
      <Route
        path="/task"
        element={
          <div>
            <Task />
            <ToastContainer position="top-center" closeOnClick rtl={false} />
          </div>
        }
      />
    </Routes>
  );
}

export default App;

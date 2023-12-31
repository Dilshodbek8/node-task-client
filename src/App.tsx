import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("node-token");

  //redirect to tasks page
  useEffect(() => {
    if (!token) navigate("/login");
    else {
      navigate("/tasks");
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <ToastContainer position="top-center" />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

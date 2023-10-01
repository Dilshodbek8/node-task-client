import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tasks");
  }, []);
  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

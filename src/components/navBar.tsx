import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
  const token = localStorage.getItem("node-token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("node-token");
    navigate("/login");
  };
  return (
    <nav className="bg-indigo-500 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/tasks"} className="text-white text-2xl font-bold">
          Task Manager
        </Link>
        <div className="space-x-4">
          {!token ? (
            <>
              <Link
                to={"/register"}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={() => logout()}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Log out
            </button>
          )}
          <Link
            to={"/tasks"}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
};

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { instance } from "../../utils/axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

export const Register: React.FC = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const login = async (formData: FormData) => {
    try {
      const response = await instance.post("/users/register", formData);
      return response.data;
    } catch (error) {
      throw new Error("register failed"); // Handle login errors
    }
  };
  const { mutate, isLoading } = useMutation((data: FormData) => login(data), {
    onSuccess: () => {
      toast.success("Registered");
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  return (
    <>
      <div>
        <h2 className="text-3xl font-extrabold mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "username is required" })}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.username?.message}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>

          <div className="mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {!isLoading ? "Register" : "Loading"}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p>
            Create an account?
            <a href="/register" className="text-indigo-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

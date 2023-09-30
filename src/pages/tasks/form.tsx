import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { instance } from "../../utils/axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom"; // Import useHistory directly
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export interface FormData {
  title: string;
  description: string;
  deadline: string;
}

export const CreateTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Use useNavigate hook

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const createTask = async (formData: FormData) => {
    try {
      const response = await instance.post("/tasks", formData);
      return response.data;
    } catch (error) {
      throw new Error("creating failed");
    }
  };
  const updateTask = async (formData: FormData) => {
    try {
      const response = await instance.put(`/tasks/${id}`, formData);
      return response.data;
    } catch (error) {
      throw new Error("Updating failed");
    }
  };

  const { mutate, isLoading } = useMutation(
    (data: FormData) => (id ? updateTask(data) : createTask(data)),
    {
      onSuccess: (data) => {
        console.log(id ? "Updated successfully" : "Created successfully", data);
        toast.success(id ? "Updated successfully" : "Created successfully");
        navigate("/tasks");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };
  React.useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        const response = await instance.get(`/tasks/${id}`);
        const taskData = response.data;
        setValue("title", taskData.title);
        setValue("description", taskData.description);
        setValue("deadline", taskData.deadline);
      };
      fetchTaskDetails();
    }
  }, [id, setValue]);

  return (
    <div className="w-8/12">
      <h2 className="text-3xl font-extrabold mb-6">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "title is required" })}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "description is required",
              minLength: {
                value: 6,
                message: "description must be at least 6 characters",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.description?.message}
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 font-bold">
            Deadline
          </label>
          <input
            type="deadline"
            id="deadline"
            {...register("deadline", {
              required: "deadline is required",
              minLength: {
                value: 6,
                message: "deadline must be at least 6 characters",
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.deadline?.message}
          </p>
        </div>

        <div className="mt-6">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {!isLoading ? "Create" : "Loading"}
          </button>
        </div>
      </form>
    </div>
  );
};

import { Link } from "react-router-dom";
import { queryClient } from "../../main";
import { instance } from "../../utils/axios";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formatDate";

export function Tasks() {
  const token = localStorage.getItem("node-token");

  const req = () => {
    return instance.get("tasks").then((res) => res.data);
  };

  const { data } = useQuery("todos", req);

  const deleteTask = async (taskId: any) => {
    await instance.delete(`tasks/${taskId}`);
  };
  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      toast.success("Deleted successfully");
    },
    onError: () => {
      toast.error("Authorize");
    },
  });

  return (
    <div className="w-9/12">
      <div className="flex items-center justify-between my-3">
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
        {token && (
          <Link
            to={"/createtask"}
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Task
          </Link>
        )}
      </div>
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((task: any) => (
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  {task.description}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  {formatDate(task.deadline)}
                </td>
                {token ? (
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    <button
                      onClick={() => {
                        deleteTaskMutation.mutate(task._id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/createtask/${task._id}`}
                      className="ml-4 text-indigo-500 hover:text-indigo-700"
                    >
                      Update
                    </Link>
                  </td>
                ) : (
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    <Link
                      to={`/login`}
                      className="ml-4 text-indigo-500 hover:text-indigo-700"
                    >
                      Log in
                    </Link>{" "}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

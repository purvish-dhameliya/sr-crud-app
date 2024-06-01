import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../features/tasks/tasksSlice";
import InputBox from "../components/InputBox";
import ButtonBox from "../components/ButtonBox";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { taskSchema } from "../utils/validations";

const TasksPage = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = useCallback(async () => {
    try {
      await taskSchema.validate(newTask, { abortEarly: false });
      await dispatch(createTask(newTask));
      setNewTask({ title: "", description: "" });
      setError("");
      toast.success("Task created successfully");
    } catch (error) {
      setError(error.errors[0]);
    }
  }, [dispatch, newTask]);

  const handleUpdateTask = useCallback(async () => {
    try {
      await taskSchema.validate(
        { title: editedTitle, description: editedDescription },
        { abortEarly: false }
      );
      await dispatch(
        updateTask({
          id: editingTask._id,
          taskData: { title: editedTitle, description: editedDescription },
        })
      );
      setEditingTask(null);
      setEditedTitle("");
      setEditedDescription("");
      toast.success("Task updated successfully");
    } catch (error) {
      setError(error.errors[0]);
    }
  }, [dispatch, editingTask, editedTitle, editedDescription]);

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Tasks</h1>
      <div className="mb-4 flex justify-center flex-col gap-3 items-center">
        <InputBox
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Enter task title"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 items-center"
        />
        <InputBox
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Enter task description"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
        />
        <div>
          <ButtonBox
            onClick={handleCreateTask}
            className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-500"
          >
            Add Task
          </ButtonBox>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
      <ul className="space-y-4">
        {tasks?.map((task) => (
          <li
            key={task._id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <span className="text-lg">Title: {task.title}</span>
              <br />
              <span className="text-lg">Description: {task.description}</span>
            </div>
            <div className="flex space-x-2">
              <ButtonBox
                onClick={() => {
                  setEditingTask(task);
                  setEditedTitle(task.title);
                  setEditedDescription(task.description);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </ButtonBox>
              <ButtonBox
                onClick={() => handleDeleteTask(task._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </ButtonBox>
            </div>
          </li>
        ))}
      </ul>
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <InputBox
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Enter task title"
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <InputBox
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Enter task description"
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <ButtonBox
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </ButtonBox>
              <ButtonBox
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </ButtonBox>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;

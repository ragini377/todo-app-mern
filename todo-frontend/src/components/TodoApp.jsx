import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";
import TodoList from "./TodoList";
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
    setLoading(false);
  };

  // ADD TASK
  const handleAdd = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await createTodo({ title: newTask, completed: false });
      setTodos((prev) => [...prev, res.data]);
      setNewTask("");
      setStatusMessage("Task added successfully");
    } catch (err) {
      console.log(err);
      setStatusMessage("Error adding task");
    }

    setTimeout(() => setStatusMessage(""), 2000);
  };

  // TOGGLE TASK (FIXED)
  const handleToggle = async (id) => {
    const currentTodo = todos.find((todo) => todo._id === id);
    if (!currentTodo) return;

    const updatedStatus = !currentTodo.completed;

    // Update UI instantly
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, completed: updatedStatus } : todo
      )
    );

    try {
      await updateTodo(id, { completed: updatedStatus });
      setStatusMessage("Task updated successfully");
    } catch (err) {
      console.log(err);
      setStatusMessage("Error updating task");
    }

    setTimeout(() => setStatusMessage(""), 2000);
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));

    try {
      await deleteTodo(id);
      setStatusMessage("Task deleted successfully");
    } catch (err) {
      console.log(err);
      setStatusMessage("Error deleting task");
    }

    setTimeout(() => setStatusMessage(""), 2000);
  };

  // EDIT TASK (FIXED - NO BLINK)
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await updateTodo(id, updatedData);

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? res.data : todo
        )
      );

      setStatusMessage("Task updated successfully");
    } catch (err) {
      console.log(err);
      setStatusMessage("Error updating task");
    }

    setTimeout(() => setStatusMessage(""), 2000);
  };

  // SEARCH FILTER
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-5">
        <h1 className="text-3xl font-bold text-center text-orange-500">
          My Todo List
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* ADD SECTION */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Add
          </button>
        </div>

        {/* STATUS MESSAGE */}
        {statusMessage && (
          <p className="text-sm text-center text-blue-500">
            {statusMessage}
          </p>
        )}

        {/* TODO LIST */}
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}   
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TodoApp;
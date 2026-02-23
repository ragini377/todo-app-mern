import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch todos on component mount

  useEffect(() => {
    fetchTodos();
  }, []);
// Fetch todos from backend
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
// Add new todo
  const handleAdd = async () => {
    if (!newTask.trim()) return;

    const tempTodo = {
      _id: Date.now(), // temporary id
      title: newTask,
      completed: false,
    };

    setTodos(prev => [...prev, tempTodo]); // UI instantly update
    setNewTask("");
    setStatusMessage("Task added successfully");
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);

    try {
      await createTodo({ title: newTask, completed: false });
    } catch (err) {
      console.log(err);
      setStatusMessage("Error adding task ");
      setTimeout(() => {
        setStatusMessage("");
      }, 2000);
    }
  };
  // Toggle todo completion
  const handleToggle = async (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo._id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
    // Show status message
    setStatusMessage("Task updated successfully");



    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
    await updateTodo(id);
  };
// Delete todo
  const handleDelete = async (id) => {
    setTodos(prev => prev.filter(todo => todo._id !== id));
    setStatusMessage("Task deleted successfully");
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);

    try {
      await deleteTodo(id);
    } catch (err) {
      console.log(err);
      setStatusMessage("Error deleting task ");
      setTimeout(() => {
        setStatusMessage("");
      }, 2000);
    }
  };
  // Filter todos based on search term
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Clear any status message while searching
    setStatusMessage("");

  };
  // Render the component
  return (
// Main container with gradient background and centered content
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-5">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-orange-500">
          My Todo List
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search task..."
          value={searchTerm}
          onChange={handleSearch}


          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Add Task Section */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            // Update newTask state and clear status message on input change
            onChange={(e) => {
              setNewTask(e.target.value);
              setStatusMessage("");
            }}
            // Allow adding task by pressing Enter key
            onKeyDown={(e) => {
              // Check if the pressed key is Enter
              if (e.key === "Enter") {
                e.preventDefault();   // prevent page jump
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

        {/* Status Message */}
        {statusMessage && (
          <p className="text-sm text-center text-blue-500">
            {statusMessage}

          </p>
        )}




        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          loading={loading}
        />

      </div>
    </div>
  );
};

export default TodoApp;
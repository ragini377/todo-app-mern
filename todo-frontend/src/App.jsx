import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/api";
import TodoApp from "./components/TodoApp";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!newTask) return;
    await createTodo({ title: newTask, completed: false });
    setNewTask("");
    fetchTodos();
  };

  const handleToggle = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div>
      <TodoApp
        todos={todos}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAdd={handleAdd}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
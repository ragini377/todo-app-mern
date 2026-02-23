import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete, loading , searchTerm}) => {
  if (loading) return <p>Loading...</p>;

  if (!todos.length) return <p>No tasks yet!</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

export default TodoList;
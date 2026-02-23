const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none", flex: 1 }}>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo._id)}>Delete</button> {/*delete for every task */}
    </div>
  );
};

export default TodoItem;
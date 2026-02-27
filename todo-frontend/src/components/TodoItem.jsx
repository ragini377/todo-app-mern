import { useState, useEffect } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  // Sync title when parent updates
  useEffect(() => {
    setNewTitle(todo.title);
  }, [todo.title]);

  const handleSave = async () => {
    if (!newTitle.trim()) return;

    await onUpdate(todo._id, { title: newTitle });

    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      {/* Toggle Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />

      {/* Edit Mode */}
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              flex: 1,
            }}
          >
            {todo.title}
          </span>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}

      {/* Delete */}
      <button type="button" onClick={() => onDelete(todo._id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
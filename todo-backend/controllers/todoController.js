const Todo = require("../models/Todo");

// Get All Todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Create Todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({ title });
  res.status(201).json(todo);
};

// Update Todo
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(todo);
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
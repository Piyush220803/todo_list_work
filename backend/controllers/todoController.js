import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const createTodo = async (req, res) => {
  const todo = await Todo.create({
    userId: req.user._id,
    text: req.body.text,
  });
  res.json(todo);
};

export const getMyTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });
  res.json(todos);
};

export const getAllClientTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const todos = await Todo.find()
    .populate("userId", "name email")
    .skip(skip)
    .limit(limit);
  const total = await Todo.countDocuments();

  res.json({ todos, total, page, totalPages: Math.ceil(total / limit) });
};

// Update a todo
export const updateTodo = async (req, res) => {
  const { text, completed } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || todo.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Todo not found or access denied" });
    }

    if (text) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || todo.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Todo not found or access denied" });
    }

    await todo.remove();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

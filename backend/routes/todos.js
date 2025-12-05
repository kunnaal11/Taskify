import express from "express";
import auth from "../middleware/auth.js";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get all todos
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

// Create todo
router.post("/", auth, async (req, res) => {
  const { title } = req.body;

  const todo = new Todo({
    title,
    userId: req.user.id
  });

  await todo.save();
  res.json(todo);
});

// Mark completed
router.patch("/:id/complete", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  if (todo.userId.toString() !== req.user.id)
    return res.status(401).json({ message: "Unauthorized" });

  todo.completed = true;
  await todo.save();

  res.json(todo);
});

export default router;

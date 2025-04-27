import express from "express";
import {
  createTodo,
  getMyTodos,
  getAllClientTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

import { protect, isAdmin, isClient } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTodo);
router.get("/my", protect, isClient, getMyTodos);
router.get("/admin", protect, isAdmin, getAllClientTodos);
router.put("/:id", protect, isClient, updateTodo);
router.delete("/:id", protect, isClient, deleteTodo);

export default router;

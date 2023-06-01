import express from "express";
import jwt from "jsonwebtoken";

import user, { TodoModel } from "../models/user.js";
import { getToken } from "../utils/getToken.js";

const router = express.Router();

export const createTodo = async (req, res) => {
  const { label } = req.body;

  const newTodo = new TodoModel({
    label,
    isDone: false,
    createAt: new Date().toISOString(),
  });

  try {
    const { id } = jwt.decode(getToken(req));
    const userData = await user.findOne({ _id: id });
    userData.todos.push(newTodo);
    await userData.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const checkTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const { id: userId } = jwt.decode(getToken(req));

    const userData = await user.findOne({ _id: userId });
    const todoIndex = userData.todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1)
      return res.status(404).send(`No todo with id: ${todoId}`);

    userData.todos[todoIndex].isDone = true;
    await userData.save();

    res.status(200).json(userData.todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const { id: userId } = jwt.decode(getToken(req));

    const userData = await user.findOne({ _id: userId });
    const todoIndex = userData.todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1)
      return res.status(404).send(`No todo with id: ${todoId}`);

    userData.todos.splice(todoIndex, 1);
    await userData.save();

    res.status(200).json({ message: "Todo deleted successfully", id: todoId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;

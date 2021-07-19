import express from "express";
const router = express.Router();

import validator from "express-validator";
const { check, validationResult } = validator;
import auth from "../middleware/auth.js";
import Todo from "../models/Todo.js";

//@GET - /api/todos - get all todos from user - Private
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//@POST - /api/todos - create new todo - Private
router.post(
  "/",
  [
    auth,
    [check("text", "Please enter something for this todo").not().isEmpty()],
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text, important } = req.body;

    try {
      const todoFields = {
        text: text,
        user: req.user.id,
      };
      if (important) {
        todoFields.important = important;
      }
      const newTdodo = new Todo({
        ...todoFields,
      });

      const todo = await newTdodo.save();
      res.send(todo);
    } catch (err) {
      res.status(500).send("server error");
    }
  }
);

//@PUT - /api/todos/:id - update todo - Private
router.put("/:id", auth, async (req, res) => {
  const { text, completed, important } = req.body;

  const todoFields = { text, completed, important };

  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: todoFields },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//@DELETE - /api/todos/:id - delete by ID - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ msg: "Todo removed" });
  } catch (err) {
    res.status(500).send("server error");
  }
});

export default router;
const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const TaskSchema = new mongoose.Schema({
  name: { type: String, require: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", TaskSchema);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
    //res.json([{name: "something", completed: false}]);
  } catch (error) {
    res.status(500).json({ error: "Something happen!" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({ name: req.body.name });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Something happen!" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!updated) {
      res.status(404).json({ error: "Task not found" });
    }
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Something happen!" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedOne = await Task.findByIdAndDelete(req.params.id);
    if (!deletedOne) {
      res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something happen!" });
  }
});

/*
GET /tasks - Retrieve all tasks.

POST /tasks - Create a new task. A task should have at least a title (string) and a completed (boolean, default false).

PUT /tasks/:id - Update a task's title and/or completed status.

DELETE /tasks/:id - Delete a task by ID.*/

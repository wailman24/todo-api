const express = require("express");
const auth = require("../middleware/Auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { validate, Task } = require("../models/tasks");
const mongoose = require("mongoose");

router.get("/", auth, async (req, res) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({
      userId: new mongoose.Types.ObjectId(userid),
    });

    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({
    title: req.body.title,
    descrip: req.body.descrip,
  });
  task.userId = req.user._id;

  task = await task.save();
  res.send(task);
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const taskID = req.params.id;
    const user = req.user._id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskID, userId: user },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user._id;

    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: user });

    if (!deletedTask)
      res.status(404).json({ message: "Task not found or unauthorized" });

    res.json({ deletedTask });
  } catch (error) {
    res.status().json({ message: "Error updating task", error: error.message });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const Joi = require("joi");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    completed: {
      type: Boolean,
      required: true,
    },
  })
);

function validatetask(task) {
  const schema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.bool(),
  });

  return schema.validate(task);
}

module.exports.Task = Task;
module.exports.validate = validatetask;

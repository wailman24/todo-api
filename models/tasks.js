const mongoose = require("mongoose");
const Joi = require("joi");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: { type: String, required: true },
    descrip: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);

function validatetask(task) {
  const schema = Joi.object({
    title: Joi.string().required(),
    descrip: Joi.string(),
  });

  return schema.validate(task);
}

module.exports.Task = Task;
module.exports.validate = validatetask;

const express = require("express");
const config = require("config");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
});

router.post("/login", async (req, res) => {
  const { error } = validateuser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalide email or password");
  const validatepassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatepassword)
    return res.status(400).send("invalide email or password");
  const token = user.generateAuthToken();
  res.send(token);
});
function validateuser(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}
module.exports = router;

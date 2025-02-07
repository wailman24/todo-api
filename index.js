const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();
const users = require("./routes/user");
const tasks = require("./routes/tasks");
const cors = require("cors");
app.use(cors());

if (!config.get("jwtPrivateKey")) {
  console.log("jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/todo-app")
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("couldn't connect ... ", error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listenning on port... ${port}`));

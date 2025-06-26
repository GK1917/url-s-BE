const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
//Mwsl3n0P6Es756l8

mongoose
  .connect("mongodb+srv://admin:Mwsl3n0P6Es756l8@gopal0271.p95zfic.mongodb.net/urlshortner")
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("Eroor connecting to DB"));

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());



//routers
const authRouter = require("./routes/authRoutes");
const urlRouter = require("./routes/urlRoutes");
const urlController = require("./controllers/urlController");

app.use("/auth", authRouter);
app.use("/urls", urlRouter);
app.use("/:shortUrl", urlController.redirectUrl);

//to support req.params.req.query etc...

// const StudentSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
// });

// const Student = mongoose.model("student", StudentSchema);

// const Student1 = new Student({ name: "A", age: 10, email: "a@b.com" });
// Student1.save();

// Student.create({ name: "B", age: 12, email: "abc@gmail.com" });

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

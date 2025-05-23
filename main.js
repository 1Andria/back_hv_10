const express = require("express");
const ExpensesRoute = require("./expenses/expenses.route.js");
const randomRouter = require("./randomFacts/random.route.js");
const halfPassedMiddleware = require("./middlewares/halfPassed.middleware.js");
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/expenses", ExpensesRoute);
app.get("/create", (req, res) => {
  res.render("pages/create.ejs");
});

app.use("/random", halfPassedMiddleware, randomRouter);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

// 5) you should delete images from cloudinary when you delete or update expense.

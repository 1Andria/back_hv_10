const express = require("express");
const ExpensesRoute = require("./expenses/expenses.route.js");
const randomRouter = require("./randomFacts/random.route.js");
const halfPassedMiddleware = require("./middlewares/halfPassed.middleware.js");
const app = express();
app.use(express.json());

app.use("/expenses", ExpensesRoute);
app.use("/random", halfPassedMiddleware, randomRouter);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

// 5) Create a /random-fact route that returs some random fact about anything that you want, create a middleware that adds to random route and randomly half of request blocks and half of requests pass.

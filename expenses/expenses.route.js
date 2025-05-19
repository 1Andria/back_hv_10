const { Router } = require("express");
const {
  getAllExpenses,
  PostNewExpense,
  DeleteExpenseById,
  UpdateExpenseById,
} = require("./expenses.service.js");
const hasKeyMiddleware = require("../middlewares/hasKey.middleware.js");
const requiredFieldsMiddleware = require("../middlewares/requiredFields.middleware.js");

const ExpensesRoute = Router();

ExpensesRoute.get("/", getAllExpenses);
ExpensesRoute.post("/", requiredFieldsMiddleware, PostNewExpense);
ExpensesRoute.delete("/:id", hasKeyMiddleware, DeleteExpenseById);
ExpensesRoute.put("/:id", UpdateExpenseById);

module.exports = ExpensesRoute;

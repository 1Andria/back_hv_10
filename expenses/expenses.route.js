const { Router } = require("express");
const {
  getAllExpenses,
  PostNewExpense,
  DeleteExpenseById,
  UpdateExpenseById,
} = require("./expenses.service.js");
const hasKeyMiddleware = require("../middlewares/hasKey.middleware.js");
const requiredFieldsMiddleware = require("../middlewares/requiredFields.middleware.js");
const { upload } = require("../config/cloudinary.config.js");
const ExpensesRoute = Router();

ExpensesRoute.get("/", getAllExpenses);
ExpensesRoute.post(
  "/",
  upload.single("image"),
  requiredFieldsMiddleware,
  PostNewExpense
);
ExpensesRoute.delete("/:id", hasKeyMiddleware, DeleteExpenseById);
ExpensesRoute.put("/:id", upload.single("image"), UpdateExpenseById);

module.exports = ExpensesRoute;

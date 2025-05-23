const { Router } = require("express");
const {
  getAllExpenses,
  PostNewExpense,
  DeleteExpenseById,
  UpdateExpenseById,
  GetExpensesById,
  GetUpdateId,
} = require("./expenses.service.js");
const hasKeyMiddleware = require("../middlewares/hasKey.middleware.js");
const requiredFieldsMiddleware = require("../middlewares/requiredFields.middleware.js");
const { upload } = require("../config/cloudinary.config.js");
const ExpensesRoute = Router();

ExpensesRoute.get("/", getAllExpenses);

ExpensesRoute.post(
  "/upload",
  upload.single("image"),
  requiredFieldsMiddleware,
  PostNewExpense
);
ExpensesRoute.get("/:id/details", GetExpensesById);
// ExpensesRoute.delete("/:id/delete", hasKeyMiddleware, DeleteExpenseById);
ExpensesRoute.post("/:id/delete", DeleteExpenseById);
// ExpensesRoute.put("/:id", upload.single("image"), UpdateExpenseById);
ExpensesRoute.post("/:id/updated", upload.single("image"), UpdateExpenseById);
ExpensesRoute.get("/:id/update", GetUpdateId);
ExpensesRoute.post("/:id/update", upload.single("image"), UpdateExpenseById);

module.exports = ExpensesRoute;

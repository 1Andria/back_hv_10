const fs = require("fs/promises");
const { deleteFromCloduinary } = require("../config/cloudinary.config");

const getAllExpenses = async (req, res) => {
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  const page = Number(req.query.page || 1);
  let take = Number(req.query.take || 30);
  take = Math.min(take, 30);
  const start = (page - 1) * take;
  const end = page * take;
  const paginated = ParsedData.slice(start, end);

  res.json({
    total: ParsedData.length,
    page,
    take,
    data: paginated,
  });
};

const PostNewExpense = async (req, res) => {
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  if (!req.body?.content || !req.body.category) {
    return res.status(400).json({ error: "Content and category is required" });
  }
  const lastId = ParsedData[ParsedData.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    content: req.body.content,
    category: req.body.category,
    image: req.file.path,
    createdAt: new Date().toISOString(),
  };
  ParsedData.push(newExpense);
  await fs.writeFile("expenses.json", JSON.stringify(ParsedData));
  res.status(201).json({ message: "expense created successfully" });
};

const DeleteExpenseById = async (req, res) => {
  const secret = req.headers["secret"];
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  const id = Number(req.params.id);
  const index = ParsedData.findIndex((el) => el.id === id);
  const fileName = ParsedData[index].image.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  const publicFileId = `uploads/${fileId}`;
  await deleteFromCloduinary(publicFileId);
  if (index == -1) {
    return res.status(404).json({ message: "Expense can not be deleted" });
  }
  ParsedData.splice(index, 1);
  await fs.writeFile("expenses.json", JSON.stringify(ParsedData));
  res.status(201).json({ message: "expense deleted successfully" });
};

const UpdateExpenseById = async (req, res) => {
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  const id = Number(req.params.id);
  const index = ParsedData.findIndex((el) => el.id === id);
  if (index == -1) {
    return res.status(404).json({ message: "Expense can not be deleted" });
  }
  if (req.file) {
    const fileName = ParsedData[index].image.split("uploads/")[1];
    const fileId = fileName.split(".")[0];
    const publicFileId = `uploads/${fileId}`;
    await deleteFromCloduinary(publicFileId);
  }
  const updateReq = {};

  if (req.body?.content) updateReq.content = req.body.content;
  if (req.file?.path) updateReq.image = req.file.path;
  ParsedData[index] = {
    ...ParsedData[index],
    ...updateReq,
  };
  await fs.writeFile("expenses.json", JSON.stringify(ParsedData));
  res.status(200).json({ message: "expense updated successfully" });
};

module.exports = {
  getAllExpenses,
  PostNewExpense,
  DeleteExpenseById,
  UpdateExpenseById,
};

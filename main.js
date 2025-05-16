const express = require("express");
const fs = require("fs/promises");
const app = express();
app.use(express.json());

// 1) Create expenses CRUD using Express js.
// 2) Add pagination feature, /expenses?page=1&take=30, your server should be return 30 default.
// 3) You should add validation to delete expense. The expense should be deleted by user who pass some secret key from the headers, like secret=random123.
// 4) Handle errors, if user does not pass key, or if user want to delete non existing expense.
// use FS module and Express js. expenses info should be saved in expenses.json file.

app.get("/expenses", async (req, res) => {
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
});

app.post("/expenses", async (req, res) => {
  const category = req.headers["category"];
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  if (!category) {
    return res.status(401).json({ error: "Category is required" });
  }
  if (!req.body?.content) {
    return res.status(400).json({ error: "Content is required" });
  }
  const lastId = ParsedData[ParsedData.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    content: req.body.content,
    category,
    createdAt: new Date().toISOString(),
  };
  ParsedData.push(newExpense);
  await fs.writeFile("expenses.json", JSON.stringify(ParsedData));
  res.status(201).json({ message: "expense created successfully" });
});

app.delete("/expenses/:id", async (req, res) => {
  const secret = req.headers["secret"];
  if (secret != "BigSecret") {
    return res.status(401).json({ error: "u dont have permition" });
  }
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  const id = Number(req.params.id);
  const index = ParsedData.findIndex((el) => el.id === id);
  if (index == -1) {
    return res.status(404).json({ message: "Expense can not be deleted" });
  }

  ParsedData.splice(index, 1);
  await fs.writeFile("expenses.json", JSON.stringify(ParsedData));
  res.status(201).json({ message: "expense deleted successfully" });
});

app.put("/expenses/:id", async (req, res) => {
  const expenses = await fs.readFile("expenses.json", "utf-8");
  const ParsedData = JSON.parse(expenses);
  const id = Number(req.params.id);
  const index = ParsedData.findIndex((el) => el.id === id);
  if (index == -1) {
    return res.status(404).json({ message: "Expense can not be deleted" });
  }
  ParsedData[index] = {
    ...ParsedData[index],
    content: req.body?.content,
  };
  await fs.writeFile("expenses.json", JSON.stringify(ParsedData));
  res.status(201).json({ message: "expense updated successfully" });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

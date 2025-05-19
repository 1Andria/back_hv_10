const { Router } = require("express");

const randomRouter = Router();

const FactArray = ["არვიცი არვიცი", "FACT1", "FACT2", "FACT3", "FACT4"];

randomRouter.get("/", (req, res) => {
  const randomIndex = Math.floor(Math.random() * FactArray.length);
  const random = FactArray[randomIndex];
  res.send(random);
});

module.exports = randomRouter;

module.exports = (req, res, next) => {
  const checker = Math.floor(Math.random() * 1000) + 1;

  if (checker % 2 == 0) {
    return res.status(401).json({ error: "denied" });
  }
  next();
};

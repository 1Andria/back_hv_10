module.exports = (req, res, next) => {
  if (!req.body?.category) {
    return res.status(401).json({ error: "Category is required" });
  }
  if (!req.body?.content) {
    return res.status(400).json({ error: "Content is required" });
  }
  next();
};

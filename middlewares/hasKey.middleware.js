module.exports = (req, res, next) => {
  const secret = req.headers["secret"];
  if (secret != "BigSecret") {
    return res.status(401).json({ error: "u dont have permition" });
  }
  next();
};

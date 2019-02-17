const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password }= req.body;

  if (!username || !password) {
    return res.status(401).json({
      message: "Please enter both a username and password."
    });
  }

  if (username !== "dummy" || password !== "user") {
    return res.status(401).json({
      message: "Your username or password are incorrect."
    });
  }

  const token = jwt.sign({ data: username }, 'MY_SECRET');

  return res.status(200).json({
    type: "success",
    token
  });
}
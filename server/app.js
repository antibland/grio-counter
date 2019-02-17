const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

function verifyToken(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // If token not present, deny access
  if (!token) return res.json({ success: false, message: "No token provided" });
  // Attempt token verification
  jwt.verify(token, 'MY_SECRET', (err, decodedData) => {
    // if problem with token verification, deny access
    if (err) return res.json({success: false, message: "Invalid token."})

    next();
  });
}

const counterApi = require("./controllers/counter.js");
const user = require("./controllers/user.js");

// Protect api routes
app.all('/api/*', verifyToken);

app.post('/login', user.login);
app.post('/api/counter', counterApi.getCount);
app.post('/api/counter/increment', counterApi.incrementCount);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});